import re

def fix_colors(content):
    c = content
    
    # Generic replacements
    replacements = {
        'bg-[#011627]': 'bg-base-100',
        'bg-[#011627]/95': 'bg-base-100/95',
        'bg-[#011627]/98': 'bg-base-100/98',
        'bg-[#0A2A3A]': 'bg-base-200',
        
        'text-[#FFFFFF]': 'text-base-content',
        'text-[#FFFFFF]/90': 'text-base-content/90',
        'text-[#FFFFFF]/80': 'text-base-content/80',
        'text-[#FFFFFF]/60': 'text-base-content/60',
        'text-[#FFFFFF]/50': 'text-base-content/50',
        
        'text-[#CCFF00]': 'text-primary',
        'bg-[#CCFF00]': 'bg-primary',
        'border-[#CCFF00]': 'border-primary',
        'bg-[#CCFF00]/10': 'bg-primary/10',
        'bg-[#CCFF00]/20': 'bg-primary/20',
        'border-[#CCFF00]/20': 'border-primary/20',
        'border-[#CCFF00]/30': 'border-primary/30',
        'border-[#CCFF00]/40': 'border-primary/40',
        'hover:bg-[#CCFF00]/10': 'hover:bg-primary/10',
        'hover:border-[#CCFF00]/40': 'hover:border-primary/40',
        'hover:text-[#CCFF00]': 'hover:text-primary',
        
        'text-[#00F5FF]': 'text-secondary',
        'text-[#00F5FF]/80': 'text-secondary/80',
        'bg-[#00F5FF]': 'bg-secondary',
        'border-[#00F5FF]/10': 'border-secondary/10',
        'border-[#00F5FF]/20': 'border-secondary/20',
        'border-[#00F5FF]/30': 'border-secondary/30',
        'border-[#00F5FF]/50': 'border-secondary/50',
        'hover:bg-[#00F5FF]/10': 'hover:bg-secondary/10',
        'hover:border-[#00F5FF]/30': 'hover:border-secondary/30',
        
        # When text is the dark background color, it's Usually on top of a bright button
        'text-[#011627]': 'text-primary-content',
        
        # specific hardcoded hover shades logic -> Use tailwind opacity for dark/light robustness
        'hover:bg-[#d4b43a]': 'hover:brightness-90',
        'hover:bg-[#a6d100]': 'hover:brightness-90',
    }
    
    for old, new in replacements.items():
        c = c.replace(old, new)
        
    return c

files_to_fix = [
    'src/pages/Pricing.tsx',
    'src/components/Navigation.tsx'
]

for fp in files_to_fix:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = fix_colors(content)
    
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {fp}")
