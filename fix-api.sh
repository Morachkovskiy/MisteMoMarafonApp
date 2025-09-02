#!/bin/bash
echo "=== БЫСТРОЕ ИСПРАВЛЕНИЕ API ==="

# 1. Создаем папку API
mkdir -p /srv/mistermo/api

# 2. Создаем виртуальное окружение
cd /srv/mistermo/api
python3 -m venv .venv

# 3. Устанавливаем зависимости
.venv/bin/pip install fastapi uvicorn gspread google-auth pydantic

# 4. Создаем systemd сервис
cat > /etc/systemd/system/mistermo-api.service << 'EOF'
[Unit]
Description=MisterMo API
After=network.target

[Service]
WorkingDirectory=/srv/mistermo/api
Environment=BOT_TOKEN=8435863501:AAG1uFhi4LTDFB3dVYxt3qvSAW9sxzdPUHc
Environment=SHEET_ID=1cGCl7k7JJn85DkPPyIg8e84XnJiRyKkorNztkctHYvw
ExecStart=/srv/mistermo/api/.venv/bin/uvicorn app:app --host 127.0.0.1 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# 5. Запускаем
systemctl daemon-reload
systemctl enable mistermo-api
systemctl restart mistermo-api

echo "=== ГОТОВО! ==="
systemctl status mistermo-api --no-pager

