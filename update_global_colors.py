import os
import glob

def fix_colors(content):
    c = content
    
    replacements = {
        'bg-[#011627]': 'bg-base-100',
        'bg-[#011627]/95': 'bg-base-100/95',
        'bg-[#011627]/98': 'bg-base-100/98',
        'bg-[#011627]/50': 'bg-base-100/50',
        'bg-[#0A2A3A]': 'bg-base-200',
        'bg-[#0A2A3A]/50': 'bg-base-200/50',
        
        'text-[#FFFFFF]': 'text-base-content',
        'text-[#FFFFFF]/90': 'text-base-content/90',
        'text-[#FFFFFF]/80': 'text-base-content/80',
        'text-[#FFFFFF]/60': 'text-base-content/60',
        'text-[#FFFFFF]/50': 'text-base-content/50',
        'text-[#FFFFFF]/40': 'text-base-content/40',
        'text-[#FFFFFF]/20': 'text-base-content/20',
        
        'text-[#CCFF00]': 'text-primary',
        'text-[#CCFF00]/80': 'text-primary/80',
        'bg-[#CCFF00]': 'bg-primary',
        'border-[#CCFF00]': 'border-primary',
        'bg-[#CCFF00]/10': 'bg-primary/10',
        'bg-[#CCFF00]/20': 'bg-primary/20',
        'border-[#CCFF00]/20': 'border-primary/20',
        'border-[#CCFF00]/30': 'border-primary/30',
        'border-[#CCFF00]/40': 'border-primary/40',
        'hover:bg-[#CCFF00]/10': 'hover:bg-primary/10',
        'hover:bg-[#CCFF00]/20': 'hover:bg-primary/20',
        'hover:border-[#CCFF00]/40': 'hover:border-primary/40',
        'hover:text-[#CCFF00]': 'hover:text-primary',
        'focus:border-[#CCFF00]/50': 'focus:border-primary/50',
        'shadow-[#CCFF00]/20': 'shadow-primary/20',
        
        'text-[#00F5FF]': 'text-secondary',
        'text-[#00F5FF]/80': 'text-secondary/80',
        'text-[#00F5FF]/60': 'text-secondary/60',
        'bg-[#00F5FF]': 'bg-secondary',
        'border-[#00F5FF]/10': 'border-secondary/10',
        'border-[#00F5FF]/20': 'border-secondary/20',
        'border-[#00F5FF]/30': 'border-secondary/30',
        'border-[#00F5FF]/50': 'border-secondary/50',
        'hover:bg-[#00F5FF]/10': 'hover:bg-secondary/10',
        'hover:border-[#00F5FF]/30': 'hover:border-secondary/30',
        'placeholder-[#00F5FF]/50': 'placeholder-secondary/50',
        
        # When text is the dark background color, it's Usually on top of a bright button
        'text-[#011627]': 'text-primary-content',
        
        # specific hardcoded hover shades logic -> Use tailwind opacity for dark/light robustness
        'hover:bg-[#d4b43a]': 'hover:brightness-90',
        'hover:bg-[#a6d100]': 'hover:brightness-90',
        
        # ThemeSwitcher storage key
        "THEME_STORAGE_KEY = 'edgeai_theme'": "THEME_STORAGE_KEY = 'theme'"
    }
    
    for old, new in replacements.items():
        c = c.replace(old, new)
        
    return c

directories = [
    'src/pages/*.tsx',
    'src/sections/*.tsx',
    'src/components/*.tsx'
]

files_to_fix = []
for d in directories:
    files_to_fix.extend(glob.glob(d))

for fp in files_to_fix:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = fix_colors(content)
    
    if content != new_content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {fp}")

# Also update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()
idx_content = idx_content.replace("'edgeai_theme'", "'theme'")
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx_content)
print("Updated index.html")
