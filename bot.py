import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

# Включаем логирование
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)

# ЗАМЕНИТЕ НА ВАШ ТОКЕН БОТА
BOT_TOKEN = "8435863501:AAG1uFhi4LTDFB3dVYxt3qvSAW9sxzdPUHc"

# ЗАМЕНИТЕ НА ВАШИ ДАННЫЕ
WEB_APP_URL = "https://morachkovskiyapp.com"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Отправляет сообщение с кнопкой для открытия Web App."""
    user = update.effective_user
    
    # Создаем кнопку для открытия Web App
    keyboard = [
        [InlineKeyboardButton(
            text="🏃‍♂️ Открыть MisterMo App", 
            web_app=WebAppInfo(url=WEB_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = f"""
🎯 *Добро пожаловать в MisterMo, {user.first_name}!*

Система Морачковского - ваш персональный подход к здоровью и питанию на основе генетических данных.

🔹 Персональные программы питания
🔹 Сканер продуктов и калорий  
🔹 Дыхательные практики
🔹 Тренировки и упражнения
🔹 Отслеживание прогресса

Нажмите кнопку ниже, чтобы начать:
    """
    
    await update.message.reply_text(
        welcome_text, 
        reply_markup=reply_markup, 
        parse_mode='Markdown'
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Показывает помощь."""
    help_text = """
📱 *Команды бота:*

/start - Запустить приложение
/help - Показать эту справку
/app - Открыть приложение

🔗 Для полного функционала используйте Web App!
    """
    
    keyboard = [
        [InlineKeyboardButton(
            text="🏃‍♂️ Открыть App", 
            web_app=WebAppInfo(url=WEB_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        help_text, 
        reply_markup=reply_markup, 
        parse_mode='Markdown'
    )

async def app_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Открывает Web App."""
    keyboard = [
        [InlineKeyboardButton(
            text="🏃‍♂️ Открыть MisterMo App", 
            web_app=WebAppInfo(url=WEB_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "Нажмите кнопку ниже, чтобы открыть приложение:", 
        reply_markup=reply_markup
    )

def main() -> None:
    """Запускает бота."""
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()

    # Добавляем обработчики команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("app", app_command))

    # Запускаем бота
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()