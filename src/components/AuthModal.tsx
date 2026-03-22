import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onLogin: (role?: 'user' | 'admin', tier?: 'free' | 'pro') => void;
  onSwitchMode: () => void;
}

export function AuthModal({ mode, onClose, onLogin, onSwitchMode }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Check test accounts
    let finalRole: 'user' | 'admin' = 'user';
    let finalTier: 'free' | 'pro' = 'free';
    
    if (formData.email === 'free@edgeai.com' && formData.password === 'free') {
      finalRole = 'user'; finalTier = 'free';
    } else if (formData.email === 'pro@edgeai.com' && formData.password === 'pro') {
      finalRole = 'user'; finalTier = 'pro';
    } else if (formData.email === 'admin@edgeai.com' && formData.password === 'admin') {
      finalRole = 'admin'; finalTier = 'pro';
    } else if (formData.email === 'demo@edgeai.com' && formData.password === 'demo') {
      finalRole = 'user'; finalTier = 'free';
    }
    
    setIsLoading(false);
    onLogin(finalRole, finalTier);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-gradient-to-br from-[#011627] to-[#011627] border border-[#00F5FF]/20 rounded-2xl p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#00F5FF]/10 flex items-center justify-center text-[#00F5FF] hover:bg-[#00F5FF]/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h2 className="text-2xl font-bold text-[#FFFFFF] mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-[#00F5FF] text-sm">
              {mode === 'login'
                ? 'Sign in to access your predictions'
                : 'Start your winning journey today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-[#00F5FF] text-sm mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00F5FF]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-[#0A2A3A] border border-[#00F5FF]/20 rounded-lg text-[#FFFFFF] placeholder-[#00F5FF]/50 focus:outline-none focus:border-[#CCFF00]/50"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#00F5FF] text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00F5FF]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#0A2A3A] border border-[#00F5FF]/20 rounded-lg text-[#FFFFFF] placeholder-[#00F5FF]/50 focus:outline-none focus:border-[#CCFF00]/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#00F5FF] text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00F5FF]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-[#0A2A3A] border border-[#00F5FF]/20 rounded-lg text-[#FFFFFF] placeholder-[#00F5FF]/50 focus:outline-none focus:border-[#CCFF00]/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00F5FF] hover:text-[#CCFF00] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#00F5FF]/20 bg-[#0A2A3A] text-[#CCFF00] focus:ring-[#CCFF00]" />
                  <span className="text-[#00F5FF] text-sm">Remember me</span>
                </label>
                <a href="#" className="text-[#CCFF00] text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#CCFF00] text-[#011627] font-bold rounded-lg hover:bg-[#d4b43a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#011627] border-t-transparent rounded-full animate-spin" />
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#00F5FF]/20" />
            <span className="text-[#00F5FF] text-sm">or</span>
            <div className="flex-1 h-px bg-[#00F5FF]/20" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 bg-[#0A2A3A] border border-[#00F5FF]/20 rounded-lg text-[#FFFFFF] hover:border-[#CCFF00]/40 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-[#0A2A3A] border border-[#00F5FF]/20 rounded-lg text-[#FFFFFF] hover:border-[#CCFF00]/40 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Switch Mode */}
          <p className="text-center mt-6 text-[#00F5FF] text-sm">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={onSwitchMode}
              className="text-[#CCFF00] font-semibold hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
