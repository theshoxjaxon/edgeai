import json
import os
import re

locales_dir = 'src/i18n/locales'

translations = {
    'en': {
        'hero': {
            'subtitle': 'AI-Powered Football Predictions',
            'titleLine1': 'BEAT THE',
            'titleLine2': 'MARKET',
            'tagline': 'Machine Learning · Value Detection · Kelly Staking',
            'badgeText': '73% Win Rate on Value Bets',
            'ctaPrimary': 'Start Free Trial',
            'ctaSecondary': 'View Predictions',
            'statWinRate': 'Win Rate',
            'statRoi': 'ROI',
            'statUsers': 'Users',
            'livePredictions': 'Live Predictions',
            'today': 'Today',
            'vs': 'vs',
            'edge': 'edge',
            'moreMatches': 'more matches',
            'viewAll': 'View All'
        }
    },
    'uz': {
        'hero': {
            'subtitle': 'AI-Yordamida Futbol Bashoratlari',
            'titleLine1': 'BOZORNI',
            'titleLine2': 'YENGING',
            'tagline': 'Sun\'iy Intellekt · Qiymatni Aniqlash · Kelly Tikish',
            'badgeText': 'Qiymatli garovlarda 73% Yutuq',
            'ctaPrimary': 'Bepul Sinov',
            'ctaSecondary': 'Bashoratlarni Ko\'rish',
            'statWinRate': 'Yutuq',
            'statRoi': 'ROI',
            'statUsers': 'Foydalanuvchilar',
            'livePredictions': 'Jonli Bashoratlar',
            'today': 'Bugun',
            'vs': 'qarshi',
            'edge': 'ustunlik',
            'moreMatches': 'qo\'shimcha o\'yin',
            'viewAll': 'Barchasi'
        }
    },
    'ru': {
        'hero': {
            'subtitle': 'Футбольные прогнозы с ИИ',
            'titleLine1': 'ПОБЕДИ',
            'titleLine2': 'РЫНОК',
            'tagline': 'Машинное обучение · Поиск Value · Ставки Келли',
            'badgeText': 'Винрейт 73% на Value-ставках',
            'ctaPrimary': 'Начать бесплатно',
            'ctaSecondary': 'Смотреть прогнозы',
            'statWinRate': 'Винрейт',
            'statRoi': 'ROI',
            'statUsers': 'Пользователей',
            'livePredictions': 'Живые прогнозы',
            'today': 'Сегодня',
            'vs': 'против',
            'edge': 'перевес',
            'moreMatches': 'еще матчей',
            'viewAll': 'Все'
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

print("Hero translations inserted.")

config_path = 'src/config.ts'
with open(config_path, 'r', encoding='utf-8') as f:
    config_content = f.read()

config_content = config_content.replace(
    'subtitle: "AI-Powered Football Predictions"', 'subtitle: "hero.subtitle"'
).replace(
    'titleLine1: "BEAT THE"', 'titleLine1: "hero.titleLine1"'
).replace(
    'titleLine2: "MARKET"', 'titleLine2: "hero.titleLine2"'
).replace(
    'tagline: "Machine Learning · Value Detection · Kelly Staking"', 'tagline: "hero.tagline"'
).replace(
    'badgeText: "73% Win Rate on Value Bets"', 'badgeText: "hero.badgeText"'
).replace(
    'ctaPrimary: "Start Free Trial"', 'ctaPrimary: "hero.ctaPrimary"'
).replace(
    'ctaSecondary: "View Predictions"', 'ctaSecondary: "hero.ctaSecondary"'
)

with open(config_path, 'w', encoding='utf-8') as f:
    f.write(config_content)

print("config.ts updated with hero keys.")
