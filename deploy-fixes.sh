#!/bin/bash

echo "=== ДЕПЛОЙ ИСПРАВЛЕНИЙ ДЛЯ АНКЕТЫ ==="

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "Ошибка: package.json не найден. Убедитесь, что вы в корневой папке проекта."
    exit 1
fi

echo "1. Собираем проект..."
npm run build

if [ $? -ne 0 ]; then
    echo "Ошибка при сборке проекта"
    exit 1
fi

echo "2. Копируем исправленные файлы в dist..."
mkdir -p dist/src/hooks dist/src/pages

# Копируем исправленные файлы
cp src/App.tsx dist/src/App.tsx
cp src/hooks/useAuth.ts dist/src/hooks/useAuth.ts
cp src/pages/Onboarding.tsx dist/src/pages/Onboarding.tsx
cp src/pages/Dashboard.tsx dist/src/pages/Dashboard.tsx

echo "3. Создаем архив для загрузки..."
cd dist
zip -r ../mistermo-fixes.zip .
cd ..

echo "4. Готово! Архив mistermo-fixes.zip создан."
echo "Теперь загрузите этот архив на сервер или используйте Lovable для деплоя."

echo "=== ИСПРАВЛЕНИЯ ВКЛЮЧАЮТ ==="
echo "- Исправлена логика маршрутизации для новых пользователей"
echo "- Улучшена обработка состояния onboarding"
echo "- Добавлено подробное логирование для отладки"
echo "- Исправлена проблема с пропуском анкеты"

