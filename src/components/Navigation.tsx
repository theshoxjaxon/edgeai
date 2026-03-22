import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  isAuthenticated: boolean;
  userRole?: 'user' | 'admin';
  userTier?: 'free' | 'pro';
  onLogout: () => void;
  onLoginClick: () => void;
}

export function Navigation({ isAuthenticated, userRole = 'user', userTier = 'free', onLogout, onLoginClick }: NavigationProps) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isAuthenticated
    ? [
        { label: t('nav.dashboard'), href: '#/dashboard' },
        { label: t('nav.predictions'), href: '#/predictions' },
        { label: t('nav.myBets'), href: '#/bets' },
        { label: t('nav.profile'), href: '#/profile' },
        ...(userRole === 'admin' ? [{ label: t('nav.admin'), href: '#/admin' }] : []),
      ]
    : [
        { label: t('nav.home'), href: '#/' },
        { label: t('nav.features'), href: '#/' },
        { label: t('nav.pricing'), href: '#/pricing' },
        { label: t('nav.predictions'), href: '#/predictions', protected: true },
      ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-base-100/95 backdrop-blur-md border-b border-secondary/10'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#/" className="flex items-center">
              <Logo />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.protected && !isAuthenticated) {
                      e.preventDefault();
                      onLoginClick();
                    }
                  }}
                  className="text-secondary hover:text-primary transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              {isAuthenticated && <LanguageSwitcher />}
              {isAuthenticated ? (
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className={`hidden sm:flex text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      userRole === 'admin' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : userTier === 'pro' 
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                    }`}>
                      {userRole === 'admin' ? 'Admin' : userTier}
                    </span>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-base-100 border border-secondary/20 hover:border-primary/40 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <ChevronDown className={`w-4 h-4 text-secondary transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-base-100 border border-secondary/20 rounded-xl shadow-xl overflow-hidden"
                      >
                        <a
                          href="#/profile"
                          className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </a>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <button
                    onClick={onLoginClick}
                    className="text-secondary hover:text-primary transition-colors text-sm font-medium"
                  >
                    Log in
                  </button>
                  <a
                    href="#/dashboard"
                    onClick={(e) => {
                      if (!isAuthenticated) {
                        e.preventDefault();
                        onLoginClick();
                      }
                    }}
                    className="px-5 py-2.5 bg-primary text-primary-content font-semibold rounded-lg hover:brightness-90 transition-colors text-sm"
                  >
                    Get Started
                  </a>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-lg bg-base-100 border border-secondary/20 flex items-center justify-center text-secondary"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-base-100/98 backdrop-blur-md border-t border-secondary/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.protected && !isAuthenticated) {
                      e.preventDefault();
                      onLoginClick();
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-secondary hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-secondary/10 space-y-3">
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 text-secondary border border-secondary/20 rounded-lg"
                  >
                    Log in
                  </button>
                  <a
                    href="#/dashboard"
                    onClick={(e) => {
                      if (!isAuthenticated) {
                        e.preventDefault();
                        onLoginClick();
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full py-3 bg-primary text-primary-content font-semibold rounded-lg text-center"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
