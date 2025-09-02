# Настройка Google Sheets для получения данных с анкеты

## Проблема
Данные с анкеты не сохраняются в Google таблицы из-за отсутствия файла ключа сервисного аккаунта.

## Решение

### 1. Создание сервисного аккаунта Google

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google Sheets API:
   - Перейдите в "APIs & Services" > "Library"
   - Найдите "Google Sheets API" и включите его

4. Создайте сервисный аккаунт:
   - Перейдите в "APIs & Services" > "Credentials"
   - Нажмите "Create Credentials" > "Service Account"
   - Заполните форму и создайте аккаунт

5. Создайте ключ:
   - В списке сервисных аккаунтов нажмите на созданный аккаунт
   - Перейдите на вкладку "Keys"
   - Нажмите "Add Key" > "Create new key"
   - Выберите "JSON" и скачайте файл

### 2. Настройка Google таблицы

1. Создайте новую Google таблицу
2. Скопируйте ID таблицы из URL (часть между /d/ и /edit)
3. Предоставьте доступ сервисному аккаунту:
   - Откройте настройки таблицы
   - Добавьте email сервисного аккаунта с правами редактора

### 3. Загрузка на сервер

1. Переименуйте скачанный JSON файл в `gsheets.json`
2. Загрузите файл на сервер в папку `/srv/mistermo/api/gsheets.json`
3. Установите правильные права доступа:
   ```bash
   chmod 600 /srv/mistermo/api/gsheets.json
   chown root:root /srv/mistermo/api/gsheets.json
   ```

### 4. Настройка переменных окружения

Убедитесь, что в systemd сервисе установлена переменная `SHEET_ID`:

```bash
# В файле /etc/systemd/system/mistermo-api.service
Environment=SHEET_ID=1cGCl7k7JJn85DkPPyIg8e84XnJiRyKkorNztkctHYvw
```

### 5. Перезапуск сервиса

```bash
sudo systemctl restart mistermo-api
sudo systemctl status mistermo-api
```

### 6. Проверка работы

После заполнения анкеты в приложении данные должны появиться в Google таблице в формате:
- Колонка A: Время заполнения
- Колонка B: ID пользователя
- Колонка C: JSON с данными анкеты

### Структура данных анкеты

Данные сохраняются в формате JSON и включают:
- Личные данные (имя, фамилия, телефон, email)
- Физические данные (рост, вес, возраст)
- Ответы на вопросы о здоровье
- Цели пользователя
- Источник информации о системе

### Отладка

Если данные не сохраняются, проверьте логи:
```bash
sudo journalctl -u mistermo-api -f
```

Ищите сообщения:
- `WARNING: Google Sheets key file not found` - файл ключа отсутствует
- `ERROR: Failed to initialize Google Sheets client` - ошибка инициализации
- `DEBUG: Successfully saved to Google Sheets` - успешное сохранение

