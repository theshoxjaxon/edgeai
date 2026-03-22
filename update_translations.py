import json
import os

locales_dir = 'src/i18n/locales'

translations = {
    'en': {
        'auth': {
            'welcomeBack': 'Welcome Back',
            'createAccount': 'Create Account',
            'signInDesc': 'Sign in to access your predictions',
            'signUpDesc': 'Start your winning journey today',
            'fullName': 'Full Name',
            'email': 'Email',
            'password': 'Password',
            'rememberMe': 'Remember me',
            'forgotPassword': 'Forgot password?',
            'signIn': 'Sign In',
            'signUpBtn': 'Create Account',
            'or': 'or',
            'noAccount': "Don't have an account?",
            'hasAccount': "Already have an account?"
        },
        'dashboard': {
            'title': 'Dashboard',
            'welcome': "Welcome back! Here's your betting overview.",
            'last24h': 'Last 24h',
            'last7d': 'Last 7 days',
            'last30d': 'Last 30 days',
            'last90d': 'Last 90 days',
            'export': 'Export',
            'bankrollGrowth': 'Bankroll Growth',
            'trackPerformance': 'Track your betting performance over time',
            'performanceMetrics': 'Performance Metrics',
            'roi': 'ROI',
            'winRate': 'Win Rate',
            'avgEdge': 'Average Edge',
            'subscription': 'Subscription',
            'manageSub': 'Manage Subscription',
            'todaysBets': "Today's Value Bets",
            'viewAll': 'View All',
            'recentBets': 'Recent Bets',
            'pending': 'Pending'
        }
    },
    'uz': {
        'auth': {
            'welcomeBack': 'Xush kelibsiz',
            'createAccount': 'Hisob yaratish',
            'signInDesc': 'Bashoratlarni ko\'rish uchun tizimga kiring',
            'signUpDesc': "G'alaba sari yo'lingizni bugun boshlang",
            'fullName': 'To\'liq ism',
            'email': 'Elektron pochta',
            'password': 'Maxfiy so\'z',
            'rememberMe': 'Meni eslab qol',
            'forgotPassword': 'Maxfiy so\'zni unutdingizmi?',
            'signIn': 'Kirish',
            'signUpBtn': 'Hisob yaratish',
            'or': 'yoki',
            'noAccount': "Hisobingiz yo'qmi?",
            'hasAccount': "Hisobingiz bormi?"
        },
        'dashboard': {
            'title': 'Boshqaruv Paneli',
            'welcome': "Xush kelibsiz! Garovlaringiz sharhi bu yerda.",
            'last24h': 'So\'nggi 24 soat',
            'last7d': 'So\'nggi 7 kun',
            'last30d': 'So\'nggi 30 kun',
            'last90d': 'So\'nggi 90 kun',
            'export': 'Eksport',
            'bankrollGrowth': 'Bankroll O\'sishi',
            'trackPerformance': 'Garov natijalaringizni vaqt bo\'yicha kuzating',
            'performanceMetrics': 'Natija ko\'rsatkichlari',
            'roi': 'ROI',
            'winRate': 'Yutuq darajasi',
            'avgEdge': "O'rtacha Edge",
            'subscription': 'Obuna',
            'manageSub': 'Obunani boshqarish',
            'todaysBets': "Bugungi qiymatli garovlar",
            'viewAll': "Barchasini ko'rish",
            'recentBets': 'So\'nggi Garovlar',
            'pending': 'Kutilmoqda'
        }
    },
    'ru': {
        'auth': {
            'welcomeBack': 'С возвращением',
            'createAccount': 'Создать аккаунт',
            'signInDesc': 'Войдите для доступа к прогнозам',
            'signUpDesc': "Начните свой путь к победе сегодня",
            'fullName': 'Полное имя',
            'email': 'Email',
            'password': 'Пароль',
            'rememberMe': 'Запомнить меня',
            'forgotPassword': 'Забыли пароль?',
            'signIn': 'Войти',
            'signUpBtn': 'Создать аккаунт',
            'or': 'или',
            'noAccount': "Нет аккаунта?",
            'hasAccount': "Уже есть аккаунт?"
        },
        'dashboard': {
            'title': 'Панель',
            'welcome': "С возвращением! Вот обзор ваших ставок.",
            'last24h': 'За 24 часа',
            'last7d': 'За 7 дней',
            'last30d': 'За 30 дней',
            'last90d': 'За 90 дней',
            'export': 'Экспорт',
            'bankrollGrowth': 'Рост банкролла',
            'trackPerformance': 'Отслеживайте свои результаты с течением времени',
            'performanceMetrics': 'Метрики',
            'roi': 'ROI',
            'winRate': 'Винрейт',
            'avgEdge': 'Средний Edge',
            'subscription': 'Подписка',
            'manageSub': 'Управление подпиской',
            'todaysBets': "Валуйные ставки на сегодня",
            'viewAll': 'Посмотреть все',
            'recentBets': 'Последние ставки',
            'pending': 'Ожидается'
        }
    }
}

for lang, data in translations.items():
    file_path = os.path.join(locales_dir, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            current_data = json.load(f)
    else:
        current_data = {}
    
    current_data.update(data)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(current_data, f, ensure_ascii=False, indent=2)

print("Translations updated successfully.")
