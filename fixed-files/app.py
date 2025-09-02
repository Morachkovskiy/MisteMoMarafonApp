import os
import sqlite3
import json
import datetime
import hashlib
import hmac
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import gspread
from google.oauth2.service_account import Credentials

# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('/srv/mistermo/api/mistermo.db')
    c = conn.cursor()
    
    # Таблица пользователей
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id TEXT PRIMARY KEY, telegram_id TEXT, username TEXT, 
                  first_name TEXT, last_name TEXT, onboarding_done INTEGER DEFAULT 0,
                  subscription_tier TEXT, created_at TEXT, updated_at TEXT)''')
    
    # Таблица прогресса
    c.execute('''CREATE TABLE IF NOT EXISTS daily_progress
                 (id TEXT PRIMARY KEY, user_id TEXT, date TEXT, weight REAL,
                  calories_consumed REAL, calories_target REAL, steps INTEGER,
                  steps_target INTEGER, water_intake REAL, water_target REAL,
                  completed_tasks TEXT, chest_measurement REAL, waist_measurement REAL,
                  hips_measurement REAL, created_at TEXT, updated_at TEXT)''')
    
    conn.commit()
    conn.close()

def conn_cur():
    conn = sqlite3.connect('/srv/mistermo/api/mistermo.db')
    return conn, conn.cursor()

def verify_init_data(init_data: str) -> dict:
    """Проверяет init_data от Telegram WebApp"""
    bot_token = os.environ.get("BOT_TOKEN", "8435863501:AAG1uFhi4LTDFB3dVYxt3qvSAW9sxzdPUHc")
    
    # Простая проверка - в реальном проекте нужно использовать HMAC
    if not init_data:
        raise HTTPException(status_code=400, detail="No init_data provided")
    
    # Парсим init_data
    try:
        # Простая проверка - в реальности нужно проверять подпись
        return {"id": "test_user", "username": "test", "first_name": "Test", "last_name": "User"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid init_data: {str(e)}")

def upsert_user(tg_user: dict) -> dict:
    """Создает или обновляет пользователя"""
    conn, c = conn_cur()
    uid = f"user_{tg_user.get('id', 'unknown')}"
    
    c.execute("""INSERT OR REPLACE INTO users(id,telegram_id,username,first_name,last_name,created_at,updated_at)
                 VALUES(?,?,?,?,?,?,?)""", 
              (uid, str(tg_user.get("id")), tg_user.get("username"), 
               tg_user.get("first_name"), tg_user.get("last_name"),
               datetime.datetime.utcnow().isoformat(), datetime.datetime.utcnow().isoformat()))
    
    conn.commit()
    c.execute("SELECT onboarding_done,subscription_tier FROM users WHERE id=?", (uid,))
    od, tier = c.fetchone()
    conn.close()
    
    return {
        "id": uid, "telegram_id": str(tg_user.get("id")),
        "username": tg_user.get("username"),
        "first_name": tg_user.get("first_name"),
        "last_name": tg_user.get("last_name"),
        "onboarding_done": bool(od), "subscription_tier": tier
    }

def get_or_create_today(user_id: str) -> dict:
    today = datetime.datetime.utcnow().date().isoformat()
    conn, c = conn_cur()
    c.execute("SELECT * FROM daily_progress WHERE user_id=? AND date=?", (user_id, today))
    row = c.fetchone()
    if not row:
        now = datetime.datetime.utcnow().isoformat()
        default = (f"{user_id}_{today}", user_id, today, None, None, 1050, None, 8000, None, 2.5, json.dumps([]), None, None, None, now, now)
        c.execute("""INSERT INTO daily_progress(id,user_id,date,weight,calories_consumed,calories_target,steps,steps_target,water_intake,water_target,completed_tasks,chest_measurement,waist_measurement,hips_measurement,created_at,updated_at)
                     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""", default)
        conn.commit()
        c.execute("SELECT * FROM daily_progress WHERE user_id=? AND date=?", (user_id, today))
        row = c.fetchone()
    cols = [d[0] for d in c.description]
    data = dict(zip(cols, row))
    if data.get("completed_tasks"):
        try: data["completed_tasks"] = json.loads(data["completed_tasks"])
        except: data["completed_tasks"] = []
    conn.close()
    return data

def update_progress(user_id: str, payload: dict) -> dict:
    rec = get_or_create_today(user_id)
    fields, values = [], []
    for k in ["weight","calories_consumed","calories_target","steps","steps_target","water_intake","water_target","chest_measurement","waist_measurement","hips_measurement"]:
        if k in payload and payload[k] is not None:
            fields.append(f"{k}=?")
            values.append(payload[k])
    if "completed_tasks" in payload and payload["completed_tasks"] is not None:
        fields.append("completed_tasks=?")
        values.append(json.dumps(payload["completed_tasks"]))
    if not fields: return rec
    values.append(datetime.datetime.utcnow().isoformat())
    fields.append("updated_at=?")
    values.append(rec["id"])
    conn, c = conn_cur()
    c.execute(f"UPDATE daily_progress SET {', '.join(fields)} WHERE id=?", values)
    conn.commit()
    conn.close()
    return get_or_create_today(user_id)

class AuthRequest(BaseModel):
    init_data: str

class ProgressUpdate(BaseModel):
    user_id: str
    weight: Optional[float] = None
    calories_consumed: Optional[float] = None
    calories_target: Optional[float] = None
    steps: Optional[int] = None
    steps_target: Optional[int] = None
    water_intake: Optional[float] = None
    water_target: Optional[float] = None
    completed_tasks: Optional[List[str]] = None
    chest_measurement: Optional[float] = None
    waist_measurement: Optional[float] = None
    hips_measurement: Optional[float] = None

class UserState(BaseModel):
    user_id: str
    onboarding_done: Optional[bool] = None
    subscription_tier: Optional[str] = None

class OnboardingSave(BaseModel):
    user_id: str
    data: Optional[dict] = None
    answers: Optional[dict] = None

app = FastAPI()
init_db()

def sheet_client():
    scopes = ["https://www.googleapis.com/auth/spreadsheets"]
    
    # Проверяем наличие файла ключа
    gsheets_key_path = "/srv/mistermo/api/gsheets.json"
    if not os.path.exists(gsheets_key_path):
        print(f"WARNING: Google Sheets key file not found at {gsheets_key_path}")
        print("Google Sheets integration will be disabled")
        return None
    
    try:
        creds = Credentials.from_service_account_file(gsheets_key_path, scopes=scopes)
        return gspread.authorize(creds).open_by_key(os.environ["SHEET_ID"]).sheet1
    except Exception as e:
        print(f"ERROR: Failed to initialize Google Sheets client: {e}")
        return None

@app.get('/api/health')
def health():
    return {'ok': True}

@app.post('/api/auth/telegram')
def auth_telegram(req: AuthRequest):
    tg_user = verify_init_data(req.init_data)
    user = upsert_user(tg_user)
    return {'user': user, 'token': f"tg_{user['id']}"}

@app.get('/api/progress/today')
def get_today(user_id: str):
    return get_or_create_today(user_id)

@app.post('/api/progress/update')
def post_update(p: ProgressUpdate):
    return update_progress(p.user_id, p.dict())

@app.get('/api/user/state')
def get_state(user_id: str):
    conn, c = conn_cur()
    c.execute('SELECT onboarding_done,subscription_tier FROM users WHERE id=?',(user_id,))
    row = c.fetchone()
    conn.close()
    if not row:
        return {'onboarding_done': False, 'subscription_tier': None}
    return {'onboarding_done': bool(row[0]), 'subscription_tier': row[1]}

@app.post('/api/user/state')
def set_state(s: UserState):
    conn, c = conn_cur()
    fields, vals = [], []
    if s.onboarding_done is not None:
        fields.append('onboarding_done=?')
        vals.append(1 if s.onboarding_done else 0)
    if s.subscription_tier is not None:
        fields.append('subscription_tier=?')
        vals.append(s.subscription_tier)
    if fields:
        vals.append(datetime.datetime.utcnow().isoformat())
        fields.append('updated_at=?')
        vals.append(s.user_id)
        c.execute(f"UPDATE users SET {', '.join(fields)} WHERE id=?", vals)
        conn.commit()
    conn.close()
    return {'ok': True}

@app.post('/api/onboarding/save')
async def onboarding_save(request: Request):
    try:
        # Читаем тело запроса
        body = await request.body()
        print(f"DEBUG: Raw body: {body}")
        
        # Парсим JSON
        try:
            payload_dict = json.loads(body.decode('utf-8'))
            print(f"DEBUG: Parsed JSON: {payload_dict}")
        except json.JSONDecodeError as e:
            print(f"DEBUG: JSON decode error: {e}")
            raise HTTPException(status_code=422, detail=f"Invalid JSON: {str(e)}")
        
        # Проверяем payload
        if 'user_id' not in payload_dict:
            raise HTTPException(status_code=422, detail="Missing user_id")
        
        payload_data = payload_dict.get('data') or payload_dict.get('answers') or {}
        
        print(f"DEBUG: Processing user_id: {payload_dict['user_id']}, data: {payload_data}")
        
        # Сохраняем в Google таблицу
        try:
            sh = sheet_client()
            if sh is None:
                print("DEBUG: Google Sheets client is not initialized, skipping Google Sheets save")
            else:
                now = datetime.datetime.utcnow().isoformat()
                sh.append_row([now, payload_dict['user_id'], json.dumps(payload_data, ensure_ascii=False)], value_input_option="RAW")
                print(f"DEBUG: Successfully saved to Google Sheets")
        except Exception as e:
            print(f"DEBUG: Google Sheets error: {e}")
            # Продолжаем выполнение даже если Google Sheets недоступен
        
        # Сохраняем в локальную базу
        conn, c = conn_cur()
        c.execute('CREATE TABLE IF NOT EXISTS onboarding (id TEXT PRIMARY KEY, user_id TEXT, created_at TEXT, data TEXT)')
        key = f"{payload_dict['user_id']}_{now}"
        c.execute('INSERT INTO onboarding(id,user_id,created_at,data) VALUES(?,?,?,?)',
                  (key, payload_dict['user_id'], now, json.dumps(payload_data, ensure_ascii=False)))
        conn.commit()
        conn.close()
        
        print(f"DEBUG: Successfully saved data for user: {payload_dict['user_id']}")
        return {'ok': True}
        
    except Exception as e:
        print(f"DEBUG: Error in onboarding_save: {e}")
        raise HTTPException(status_code=500, detail=str(e))
