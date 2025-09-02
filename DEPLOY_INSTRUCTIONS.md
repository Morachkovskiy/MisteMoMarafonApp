# Инструкции по деплою исправлений для анкеты

## Проблема
Новые пользователи не проходили анкету и сразу попадали на главную страницу.

## Исправления
1. **src/App.tsx** - Улучшена логика маршрутизации
2. **src/hooks/useAuth.ts** - Исправлена обработка состояния пользователя
3. **src/pages/Onboarding.tsx** - Улучшена логика сохранения анкеты
4. **src/pages/Dashboard.tsx** - Добавлена кнопка сброса для тестирования

## Способы деплоя

### Вариант 1: Через Lovable (Рекомендуется)
1. Откройте проект в [Lovable](https://lovable.dev/projects/58e2969d-d7de-4490-ba90-da9d398fb276)
2. Замените содержимое файлов на исправленные версии
3. Нажмите Share -> Publish

### Вариант 2: Через Git
1. Зафиксируйте изменения:
   ```bash
   git add .
   git commit -m "Fix onboarding flow for new users"
   git push
   ```

### Вариант 3: Ручная загрузка на сервер
1. Соберите проект: `npm run build`
2. Скопируйте содержимое папки `dist` на сервер
3. Перезапустите сервисы:
   ```bash
   sudo systemctl restart mistermo-api
   sudo systemctl restart mistermo-bot
   ```

## Тестирование
После деплоя:
1. Откройте приложение в Telegram
2. Новые пользователи должны увидеть анкету
3. После заполнения анкеты - страницу тарифов
4. После выбора тарифа - главную страницу

## Отладка
В консоли браузера будут видны логи:
- `App routing debug:` - показывает состояние маршрутизации
- `User has completed onboarding` / `User has NOT completed onboarding`
- `Onboarding completed, redirecting to pricing`

