import os
import glob

replacements = {
    '#05140A': '#011627',
    '#05140a': '#011627',
    '#0D2818': '#011627',
    '#0d2818': '#011627',
    '#0a1f12': '#0A2A3A',
    '#0A1F12': '#0A2A3A',
    '#C9A227': '#CCFF00',
    '#c9a227': '#CCFF00',
    '#F5F5DC': '#FFFFFF',
    '#f5f5dc': '#FFFFFF',
    '#8FBC8F': '#00F5FF',
    '#8fbc8f': '#00F5FF',
    'BetWise AI': 'EdgeAI',
    'BetWise': 'EdgeAI'
}

files = glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True)
for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)

print("Colors and branding terms replaced.")
