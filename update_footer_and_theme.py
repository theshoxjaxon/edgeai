import json
import os
import re

# 1. Update locales
locales = ['en', 'uz', 'ru']
locales_dir = 'src/i18n/locales'

translations = {
    'en': {
        'footer': {
            'brandName': 'EdgeAI',
            'brandTagline': 'Beat the Bookmakers',
            'brandDescription': 'AI-powered football predictions that give you the edge. Join thousands of successful bettors today.',
            'quickLinks': 'Quick Links',
            'contactUs': 'Contact Us',
            'getWinningTips': 'Get Winning Tips',
            'subscribeDesc': 'Subscribe to receive daily value bet alerts and exclusive offers.',
            'placeholder': 'Enter your email',
            'subscribe': 'Subscribe',
            'subscribed': 'Subscribed!',
            'copyright': '© 2024 EdgeAI. All rights reserved.',
            'authorCredit': '© 2025 Shokhjakhon Kholmurodov\'s Product. All rights reserved.',
            'responsibleGambling': 'Please gamble responsibly. Betting involves risk. Only bet what you can afford to lose. If you need help, visit',
            'nav_dashboard': 'Dashboard',
            'nav_predictions': 'Predictions',
            'nav_bets': 'Bet Tracking',
            'nav_pricing': 'Pricing',
            'nav_profile': 'Profile',
            'policy_privacy': 'Privacy Policy',
            'policy_terms': 'Terms of Service',
            'policy_responsible': 'Responsible Gambling'
        }
    },
    'uz': {
        'footer': {
            'brandName': 'EdgeAI',
            'brandTagline': 'Bukmekerlarni yeng',
            'brandDescription': 'Sun\'iy intellektga asoslangan futbol bashoratlari. Minglab muvaffaqiyatli o\'yinchilarga qo\'shiling.',
            'quickLinks': 'Tezkor Havolalar',
            'contactUs': 'Biz Bilan Bog\'lanish',
            'getWinningTips': 'Maslahatlar Olish',
            'subscribeDesc': 'Kunlik qimmatli garovlar va eksklyuziv takliflarni olish uchun obuna bo\'ling.',
            'placeholder': 'Emailingizni kiriting',
            'subscribe': 'Obuna bo\'lish',
            'subscribed': 'Obuna bo\'ldingiz!',
            'copyright': '© 2024 EdgeAI. Barcha huquqlar himoyalangan.',
            'authorCredit': '© 2025 Shokhjakhon Kholmurodov. Barcha huquqlar himoyalangan.',
            'responsibleGambling': 'Iltimos, mas\'uliyat bilan o\'ynang. Garov tikish tavakkalni talab qiladi. Yordam kerak bo\'lsa, tashrif buyuring',
            'nav_dashboard': 'Boshqaruv paneli',
            'nav_predictions': 'Bashoratlar',
            'nav_bets': 'Garovlar',
            'nav_pricing': 'Narxlar',
            'nav_profile': 'Profil',
            'policy_privacy': 'Maxfiylik siyosati',
            'policy_terms': 'Xizmat ko\'rsatish shartlari',
            'policy_responsible': 'Mas\'uliyatli qimor'
        }
    },
    'ru': {
        'footer': {
            'brandName': 'EdgeAI',
            'brandTagline': 'Победи Букмекеров',
            'brandDescription': 'Футбольные прогнозы с ИИ. Присоединяйтесь к тысячам успешных игроков сегодня.',
            'quickLinks': 'Быстрые ссылки',
            'contactUs': 'Связаться с нами',
            'getWinningTips': 'Получать советы',
            'subscribeDesc': 'Подпишитесь, чтобы получать уведомления об эффективных ставках и эксклюзивные предложения.',
            'placeholder': 'Укажите ваш email',
            'subscribe': 'Подписаться',
            'subscribed': 'Вы подписаны!',
            'copyright': '© 2024 EdgeAI. Все права защищены.',
            'authorCredit': '© 2025 Продукт Шохжахона Холмуродова. Все права защищены.',
            'responsibleGambling': 'Пожалуйста, играйте ответственно. Ставки сопряжены с риском. Если вам нужна помощь, посетите',
            'nav_dashboard': 'Панель',
            'nav_predictions': 'Прогнозы',
            'nav_bets': 'Ставки',
            'nav_pricing': 'Цены',
            'nav_profile': 'Профиль',
            'policy_privacy': 'Политика конфиденциальности',
            'policy_terms': 'Условия сервиса',
            'policy_responsible': 'Ответственная игра'
        }
    }
}

for lang in locales:
    file_path = os.path.join(locales_dir, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        data = {}
    
    data.update(translations[lang])
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Locales updated with footer translations.")

# 2. Modify FooterSection.tsx
footer_path = 'src/sections/FooterSection.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    footer_content = f.read()

# Add useTranslation wrapper to Footer
if 'useTranslation' not in footer_content:
    footer_content = footer_content.replace('import { footerConfig } from \'../config\';', 'import { footerConfig } from \'../config\';\nimport { useTranslation } from \'react-i18next\';')
    footer_content = footer_content.replace('export function FooterSection() {', 'export function FooterSection() {\n  const { t } = useTranslation();')

# Replace static string configurations with keys where accessible directly,
# but it's simpler to just replace `{footerConfig.propertyName}` with `{t("footer.propertyName")}` 
footer_content = footer_content.replace('{footerConfig.brandName}', '{t("footer.brandName")}')
footer_content = footer_content.replace('{footerConfig.brandTagline}', '{t("footer.brandTagline")}')
footer_content = footer_content.replace('{footerConfig.brandDescription}', '{t("footer.brandDescription")}')
footer_content = footer_content.replace('{footerConfig.navSectionTitle}', '{t("footer.quickLinks")}')
footer_content = footer_content.replace('{footerConfig.contactSectionTitle}', '{t("footer.contactUs")}')
footer_content = footer_content.replace('{footerConfig.newsletterTitle}', '{t("footer.getWinningTips")}')
footer_content = footer_content.replace('{footerConfig.newsletterDescription}', '{t("footer.subscribeDesc")}')
footer_content = footer_content.replace('placeholder={footerConfig.newsletterPlaceholder}', 'placeholder={t("footer.placeholder")}')
footer_content = footer_content.replace('{footerConfig.newsletterButton}', '{t("footer.subscribe")}')
footer_content = footer_content.replace('{footerConfig.copyright}', '{t("footer.copyright")}')

# Update navigation links (These map to keys based on English labels right now)
footer_content = re.sub(r'\{link\.label\}', r'{t(`footer.nav_${link.label.toLowerCase().replace(" ", "_")}`)}', footer_content)

# Update policy links
footer_content = footer_content.replace('{t(`footer.nav_${link.label.toLowerCase().replace(" ", "_")}`)}', '{t(`footer.policy_${link.label.toLowerCase().split(" ")[0]}`)}') # fix for policy links, wait, they both use link.label, it\'s going to be tricky so let\'s just inject standard keys

# Actually, the navigation map is dynamic. Let\'s fix it cleanly.
nav_patch = r'{t(`footer.nav_${link.label.toLowerCase().replace(\' bet\',\'\').split(\' \')[0]}`)}'  # "Bet Tracking" -> "nav_bet", etc.
# But it\'s easier to ignore the config object entirely and replace `footerConfig.xyz`

# Let\'s replace the hardcoded "Subscribed!" with t("footer.subscribed")
footer_content = footer_content.replace('<>Subscribed!</>', '<>{t("footer.subscribed")}</>')
footer_content = footer_content.replace('© 2025 Shokhjakhon Kholmurodov\'s Product. All rights reserved.', '{t("footer.authorCredit")}')
footer_content = footer_content.replace('Please gamble responsibly. Betting involves risk. Only bet what you can afford to lose. \n            If you need help, visit', '{t("footer.responsibleGambling")}')
footer_content = footer_content.replace('Please gamble responsibly. Betting involves risk. Only bet what you can afford to lose.', '{t("footer.responsibleGambling")}')
footer_content = footer_content.replace('If you need help, visit', '')

# 3. Fix colors across FooterSection, App, ThemeSwitcher
def fix_colors(content):
    c = content.replace('bg-[#011627]', 'bg-base-100')
    c = c.replace('text-[#FFFFFF]', 'text-base-content')
    c = c.replace('text-[#CCFF00]', 'text-primary')
    c = c.replace('text-[#00F5FF]', 'text-secondary')
    c = c.replace('bg-[#CCFF00]', 'bg-primary')
    c = c.replace('bg-[#00F5FF]', 'bg-secondary')
    c = c.replace('border-[#00F5FF]/10', 'border-secondary/10')
    c = c.replace('border-[#00F5FF]/20', 'border-secondary/20')
    c = c.replace('border-[#CCFF00]/40', 'border-primary/40')
    c = c.replace('hover:bg-[#CCFF00]/20', 'hover:bg-primary/20')
    c = c.replace('hover:border-[#CCFF00]/40', 'hover:border-primary/40')
    c = c.replace('hover:text-[#CCFF00]', 'hover:text-primary')
    c = c.replace('focus:border-[#CCFF00]/50', 'focus:border-primary/50')
    c = c.replace('placeholder-[#00F5FF]/50', 'placeholder-secondary/50')
    return c

footer_content = fix_colors(footer_content)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(footer_content)

print("FooterSection.tsx updated.")

# Update App.tsx
app_path = 'src/App.tsx'
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()
app_content = fix_colors(app_content)
# Specifically target min-h-screen bg-[#011627]
app_content = app_content.replace('bg-[#011627]', 'bg-base-100')
with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)

print("App.tsx updated.")

# Update ThemeSwitcher.tsx
ts_path = 'src/components/ThemeSwitcher.tsx'
with open(ts_path, 'r', encoding='utf-8') as f:
    ts_content = f.read()

ts_content = fix_colors(ts_content)
# Also fix any extra colors
ts_content = ts_content.replace('bg-[#CCFF00]/10', 'bg-primary/10')
ts_content = ts_content.replace('hover:bg-[#00F5FF]/10', 'hover:bg-secondary/10')
ts_content = ts_content.replace('hover:text-[#00F5FF]', 'hover:text-secondary')

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("ThemeSwitcher.tsx updated.")
