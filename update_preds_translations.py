import json
import os

locales_dir = 'src/i18n/locales'

translations = {
    'en': {
        'predictions': {
            'title': 'Predictions',
            'desc': 'AI-powered match analysis and value bets',
            'exportCSV': 'Export CSV',
            'setAlerts': 'Set Alerts',
            'searchPlaceholder': 'Search teams, leagues...',
            'allLeagues': 'All Leagues',
            'minEdgeAny': 'Min Edge: Any',
            'minEdge5': 'Min Edge: 5%+',
            'minEdge8': 'Min Edge: 8%+',
            'minEdge10': 'Min Edge: 10%+',
            'filters': 'Filters',
            'showing': 'Showing',
            'predictionsCount': 'predictions',
            'sortBy': 'Sort by:',
            'edge': 'Edge',
            'confidence': 'Confidence',
            'match': 'Match',
            'prediction': 'Prediction',
            'probabilities': 'Probabilities',
            'kelly': 'Kelly',
            'action': 'Action',
            'vs': 'vs',
            'ofBankroll': 'of bankroll',
            'trackBet': 'Track Bet',
            'noFound': 'No predictions found',
            'adjustFilters': 'Try adjusting your filters',
            'loading': 'Loading predictions...'
        }
    },
    'uz': {
        'predictions': {
             'title': 'Bashoratlar',
             'desc': 'AI yordamida har bir o\'yin tahlili va eng yaxshi garovlar',
             'exportCSV': 'CSV formatda yuklash',
             'setAlerts': 'Ogohlantirish O\'rnatish',
             'searchPlaceholder': 'Jamoa, ligalarni qidirish...',
             'allLeagues': 'Barcha Ligalar',
             'minEdgeAny': 'Min Ustunlik: Ixtiyoriy',
             'minEdge5': 'Min Ustunlik: 5%+',
             'minEdge8': 'Min Ustunlik: 8%+',
             'minEdge10': 'Min Ustunlik: 10%+',
             'filters': 'Filtrlar',
             'showing': 'Ko\'rsatilmoqda:',
             'predictionsCount': 'ta bashorat',
             'sortBy': 'Saralash:',
             'edge': 'Ustunlik',
             'confidence': 'Ishonch',
             'match': 'O\'yin',
             'prediction': 'Bashorat',
             'probabilities': 'Ehtimolliklar',
             'kelly': 'Kelly',
             'action': 'Harakat',
             'vs': 'qarshi',
             'ofBankroll': 'bankrolldan',
             'trackBet': 'Kuzatish',
             'noFound': 'Bashoratlar topilmadi',
             'adjustFilters': 'Filtrlarni o\'zgartirib ko\'ring',
             'loading': 'Bashoratlar yuklanmoqda...'
        }
    },
    'ru': {
        'predictions': {
            'title': 'Прогнозы',
            'desc': 'Анализ матчей с помощью ИИ и поиск value-ставок',
            'exportCSV': 'Экспорт CSV',
            'setAlerts': 'Оповещения',
            'searchPlaceholder': 'Поиск команд, лиг...',
            'allLeagues': 'Все лиги',
            'minEdgeAny': 'Мин. перевес: Любой',
            'minEdge5': 'Мин. перевес: 5%+',
            'minEdge8': 'Мин. перевес: 8%+',
            'minEdge10': 'Мин. перевес: 10%+',
            'filters': 'Фильтры',
            'showing': 'Показано',
            'predictionsCount': 'прогнозов',
            'sortBy': 'Сортировка:',
            'edge': 'Перевес',
            'confidence': 'Уверенность',
            'match': 'Матч',
            'prediction': 'Прогноз',
            'probabilities': 'Вероятности',
            'kelly': 'Келли',
            'action': 'Действие',
            'vs': 'против',
            'ofBankroll': 'от банка',
            'trackBet': 'Отследить ставку',
            'noFound': 'Прогнозы не найдены',
            'adjustFilters': 'Попробуйте изменить фильтры',
            'loading': 'Загрузка прогнозов...'
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

print("Predictions translations updated.")
