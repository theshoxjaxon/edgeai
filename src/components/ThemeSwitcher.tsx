import { useEffect, useState, useRef } from 'react';
import { Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { id: 'edgeai', label: 'EdgeAI' },
  { id: 'dark', label: 'Dark' },
  { id: 'forest', label: 'Forest' },
  { id: 'cyberpunk', label: 'Cyberpunk' }
];

const THEME_STORAGE_KEY = 'theme';

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'edgeai';
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-base-100 border border-secondary/20 hover:border-primary/40 transition-colors text-base-content text-sm"
        title="Change Theme"
      >
        <Palette className="w-4 h-4 text-secondary" />
        <span className="hidden sm:inline-block capitalize font-medium">{themes.find(t => t.id === currentTheme)?.label || currentTheme}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-2 w-36 bg-base-100 border border-secondary/20 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  currentTheme === theme.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-base-content hover:bg-secondary/10 hover:text-secondary'
                }`}
              >
                {theme.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
