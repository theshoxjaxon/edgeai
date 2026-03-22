import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { navConfig } from '../config';

interface NavigationProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

export function Navigation({ isAuthenticated, onLogout, onLoginClick }: NavigationProps) {
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
        { label: 'Dashboard', href: '#/dashboard' },
        { label: 'Predictions', href: '#/predictions' },
        { label: 'My Bets', href: '#/bets' },
        { label: 'Profile', href: '#/profile' },
      ]
    : [
        { label: 'Home', href: '#/' },
        { label: 'Features', href: '#/' },
        { label: 'Pricing', href: '#/pricing' },
        { label: 'Predictions', href: '#/predictions', protected: true },
      ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05140A]/95 backdrop-blur-md border-b border-[#8FBC8F]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A227] to-[#8FBC8F] flex items-center justify-center">
                <span className="text-[#0D2818] font-bold text-lg">B</span>
              </div>
              <span className="text-[#F5F5DC] font-bold text-xl hidden sm:block">
                {navConfig.logo}
              </span>
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
                  className="text-[#8FBC8F] hover:text-[#C9A227] transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D2818] border border-[#8FBC8F]/20 hover:border-[#C9A227]/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#C9A227]/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <span className="text-[#F5F5DC] text-sm hidden sm:block">Pro User</span>
                    <ChevronDown className={`w-4 h-4 text-[#8FBC8F] transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-[#0D2818] border border-[#8FBC8F]/20 rounded-xl shadow-xl overflow-hidden"
                      >
                        <a
                          href="#/profile"
                          className="flex items-center gap-3 px-4 py-3 text-[#8FBC8F] hover:bg-[#C9A227]/10 hover:text-[#C9A227] transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </a>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[#8FBC8F] hover:bg-[#C9A227]/10 hover:text-[#C9A227] transition-colors"
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
                    className="text-[#8FBC8F] hover:text-[#C9A227] transition-colors text-sm font-medium"
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
                    className="px-5 py-2.5 bg-[#C9A227] text-[#0D2818] font-semibold rounded-lg hover:bg-[#d4b43a] transition-colors text-sm"
                  >
                    Get Started
                  </a>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-lg bg-[#0D2818] border border-[#8FBC8F]/20 flex items-center justify-center text-[#8FBC8F]"
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
            className="lg:hidden bg-[#05140A]/98 backdrop-blur-md border-t border-[#8FBC8F]/10"
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
                  className="block text-[#8FBC8F] hover:text-[#C9A227] transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-[#8FBC8F]/10 space-y-3">
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 text-[#8FBC8F] border border-[#8FBC8F]/20 rounded-lg"
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
                    className="block w-full py-3 bg-[#C9A227] text-[#0D2818] font-semibold rounded-lg text-center"
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
