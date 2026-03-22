import json
import os

locales_dir = 'src/i18n/locales'

translations = {
    'en': {
        'matchDetail': {
            'loading': 'Loading match details...',
            'back': 'Back to Predictions',
            'today': 'Today',
            'aiPrediction': 'AI Prediction',
            'edge': 'Edge',
            'kellyStake': 'Kelly Stake',
            'tracking': 'Tracking',
            'trackBet': 'Track Bet',
            'setAlert': 'Set Alert',
            'share': 'Share',
            'overview': 'Overview',
            'aiAnalysis': 'AI Analysis',
            'h2h': 'H2H',
            'matchProbabilities': 'Match Probabilities',
            'probability': 'Probability',
            'oddsComparison': 'Odds Comparison',
            'oddsType': 'Odds Type',
            'draw': 'Draw',
            'marketOdds': 'Market Odds',
            'fairOdds': 'Fair Odds (AI)',
            'value': 'Value',
            'mlInsights': 'Machine learning insights',
            'h2hRecord': 'Head-to-Head Record',
            'wins': 'Wins',
            'draws': 'Draws',
            'basedOnLast': 'Based on last',
            'meetings': 'meetings',
            'recommendedStake': 'Recommended stake',
            'confidence': 'Confidence',
            'expectedValue': 'Expected Value',
            'betTracked': 'Bet Tracked',
            'trackThisBet': 'Track This Bet',
            'keyStats': 'Key Stats',
            'homeXg': 'Home xG',
            'awayXg': 'Away xG',
            'homeWinPercent': 'Home Win %',
            'bttsPercent': 'BTTS %',
            'over25Percent': 'Over 2.5 %'
        }
    },
    'uz': {
        'matchDetail': {
            'loading': 'O\'yin tafsilotlari yuklanmoqda...',
            'back': 'Bashoratlarga Qaytish',
            'today': 'Bugun',
            'aiPrediction': 'AI Bashorati',
            'edge': 'Ustunlik',
            'kellyStake': 'Kelly Ulushi',
            'tracking': 'Kuzatilmoqda',
            'trackBet': 'Garovni Kuzatish',
            'setAlert': 'Ogohlantirish',
            'share': 'Ulashish',
            'overview': 'Umumiy Ma\'lumot',
            'aiAnalysis': 'AI Tahlili',
            'h2h': 'H2H',
            'matchProbabilities': 'O\'yin Ehtimolliklari',
            'probability': 'Ehtimollik',
            'oddsComparison': 'Koeffitsientlarni Solishtirish',
            'oddsType': 'Koeffitsient Turi',
            'draw': 'Durang',
            'marketOdds': 'Bozor Koef.',
            'fairOdds': 'Adolatli (AI)',
            'value': 'Qiymat',
            'mlInsights': 'Mashinali o\'rganish',
            'h2hRecord': 'O\'zaro Uchrashuvlar',
            'wins': 'G\'alabalar',
            'draws': 'Duranglar',
            'basedOnLast': 'So\'nggi',
            'meetings': 'uchrashuv asosida',
            'recommendedStake': 'Tavsiya etilgan ulush',
            'confidence': 'Ishonch',
            'expectedValue': 'Kutilayotgan Qiymat',
            'betTracked': 'Garov Kuzatildi',
            'trackThisBet': 'Kuzatish',
            'keyStats': 'Asosiy Statistika',
            'homeXg': 'Mezbon xG',
            'awayXg': 'Mehmon xG',
            'homeWinPercent': 'Mezbon G\'alabasi %',
            'bttsPercent': 'Ikkalasi Gol %',
            'over25Percent': '2.5 dan Ko\'p %'
        }
    },
    'ru': {
        'matchDetail': {
            'loading': 'Загрузка деталей матча...',
            'back': 'Назад к прогнозам',
            'today': 'Сегодня',
            'aiPrediction': 'Прогноз ИИ',
            'edge': 'Перевес',
            'kellyStake': 'Ставка Келли',
            'tracking': 'Отслеживается',
            'trackBet': 'Отследить ставку',
            'setAlert': 'Оповещение',
            'share': 'Поделиться',
            'overview': 'Обзор',
            'aiAnalysis': 'Анализ ИИ',
            'h2h': 'H2H',
            'matchProbabilities': 'Вероятности матча',
            'probability': 'Вероятность',
            'oddsComparison': 'Сравнение коэффициентов',
            'oddsType': 'Тип коэффициента',
            'draw': 'Ничья',
            'marketOdds': 'Рыночные коэф.',
            'fairOdds': 'Справедливые (ИИ)',
            'value': 'Ценность',
            'mlInsights': 'Аналитика ML',
            'h2hRecord': 'Очные встречи',
            'wins': 'Победы',
            'draws': 'Ничьи',
            'basedOnLast': 'На основе последних',
            'meetings': 'встреч',
            'recommendedStake': 'Рекомендуемая ставка',
            'confidence': 'Уверенность',
            'expectedValue': 'Ожидаемая ценность',
            'betTracked': 'Ставка отслеживается',
            'trackThisBet': 'Следить за ставкой',
            'keyStats': 'Ключевая статистика',
            'homeXg': 'xG хозяев',
            'awayXg': 'xG гостей',
            'homeWinPercent': '% победы хозяев',
            'bttsPercent': 'ОЗ %',
            'over25Percent': 'ТБ 2.5 %'
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

print("MatchDetail translations updated.")
