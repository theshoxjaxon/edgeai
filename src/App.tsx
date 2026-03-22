import { useState, useEffect } from 'react';
import { HeroSection } from './sections/HeroSection';
import { StorySection } from './sections/StorySection';
import { ProductSection } from './sections/ProductSection';
import { ExploreSection } from './sections/ExploreSection';
import { TastingSection } from './sections/TastingSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FooterSection } from './sections/FooterSection';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Predictions } from './pages/Predictions';
import { MatchDetail } from './pages/MatchDetail';
import { BetTracking } from './pages/BetTracking';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { AuthModal } from './components/AuthModal';
import { siteConfig } from './config';

// Simple hash-based router
function useHashRouter() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return hash || '#/';
}

function LandingPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#011627]">
      <HeroSection />
      <StorySection />
      <ProductSection />
      <ExploreSection />
      <TastingSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}

function App() {
  const hash = useHashRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');
  const [userTier, setUserTier] = useState<'free' | 'pro'>('free');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Update document title
  useEffect(() => {
    document.title = siteConfig.title;
  }, []);

  // Check if route requires authentication
  const protectedRoutes = ['#/dashboard', '#/predictions', '#/bets', '#/profile', '#/admin'];
  const isProtectedRoute = protectedRoutes.some(route => hash.startsWith(route));

  // Show auth modal if trying to access protected route while not authenticated
  useEffect(() => {
    if (isProtectedRoute && !isAuthenticated) {
      setShowAuthModal(true);
      setAuthMode('login');
    }
  }, [hash, isProtectedRoute, isAuthenticated]);

  // Check for admin entrance test URL
  useEffect(() => {
    if (window.location.href.includes('?admin=true')) {
      handleLogin('admin', 'pro');
      window.location.hash = '#/dashboard';
    }
  }, []);

  const handleLogin = (role: 'user' | 'admin' = 'user', tier: 'free' | 'pro' = 'free') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserTier(tier);
    localStorage.setItem('auth-token', role === 'admin' ? 'mock-admin-token' : 'mock-user-token');
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('user');
    setUserTier('free');
    localStorage.removeItem('auth-token');
    window.location.hash = '#/';
  };

  // Render the appropriate page based on hash
  const renderPage = () => {
    // If on protected route and not authenticated, show landing with auth modal
    if (isProtectedRoute && !isAuthenticated) {
      return <LandingPage />;
    }

    switch (true) {
      case hash === '#/':
        return <LandingPage />;
      case hash === '#/dashboard':
        return <Dashboard onLogout={handleLogout} />;
      case hash === '#/predictions':
        return <Predictions onLogout={handleLogout} />;
      case hash.startsWith('#/match/'):
        const matchId = hash.replace('#/match/', '');
        return <MatchDetail matchId={matchId} onLogout={handleLogout} />;
      case hash === '#/bets':
        return <BetTracking onLogout={handleLogout} />;
      case hash === '#/profile':
        return <Profile onLogout={handleLogout} />;
      case hash === '#/admin':
        if (userRole !== 'admin') {
          return <Dashboard onLogout={handleLogout} />;
        }
        return <Admin onLogout={handleLogout} />;
      case hash === '#/pricing':
        return <LandingPage />; // Scroll to pricing section
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#011627]">
      <Navigation 
        isAuthenticated={isAuthenticated} 
        userRole={userRole}
        userTier={userTier}
        onLogout={handleLogout}
        onLoginClick={() => {
          setAuthMode('login');
          setShowAuthModal(true);
        }}
      />
      
      {renderPage()}
      
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
    </div>
  );
}

export default App;
