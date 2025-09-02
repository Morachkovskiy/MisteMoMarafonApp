#!/bin/bash

# Настройка бота на сервере
echo "=== НАСТРОЙКА БОТА ==="

# 1. Создаем виртуальное окружение
cd /srv/mistermo
python3 -m venv .venv

# 2. Активируем и устанавливаем зависимости
.venv/bin/pip install python-telegram-bot==20.7

# 3. Копируем правильный systemd сервис
cat > /etc/systemd/system/mistermo-bot.service << 'EOF'
[Unit]
Description=MisterMo Telegram Bot
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/srv/mistermo
Environment=BOT_TOKEN=8435863501:AAG1uFhi4LTDFB3dVYxt3qvSAW9sxzdPUHc
Environment=WEB_APP_URL=https://morachkovskiyapp.com
ExecStart=/srv/mistermo/.venv/bin/python bot.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

# 4. Перезагружаем systemd и запускаем
systemctl daemon-reload
systemctl enable mistermo-bot
systemctl restart mistermo-bot

# 5. Проверяем статус
echo "=== СТАТУС БОТА ==="
systemctl status mistermo-bot --no-pager

echo "=== ГОТОВО ==="

