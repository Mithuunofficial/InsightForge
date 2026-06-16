import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Stats } from './sections/Stats';
import { HowItWorks } from './sections/HowItWorks';
import { DashboardPreview } from './sections/DashboardPreview';
import { Forecasting } from './sections/Forecasting';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { GetStartedPage } from './pages/GetStartedPage';
import { ConnectingPage } from './pages/ConnectingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthPage } from './pages/AuthPage';
import { onAuthChanged, logoutUser } from './services/authService';
import type { User as AppUser } from './types';

type ViewState = 'landing' | 'auth' | 'get-started' | 'connecting' | 'dashboard';



const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  // Load session from Firebase on mount
  useEffect(() => {
    const unsubscribe = onAuthChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = (user: AppUser) => {
    setCurrentUser(user);
    setView('get-started');
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      setView('landing');
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const startOnboarding = () => {
    if (!currentUser) {
      setView('auth');
    } else {
      setView('get-started');
    }
    window.scrollTo(0, 0);
  };

  const startProcessing = () => {
    setView('connecting');
    window.scrollTo(0, 0);
  };

  const showDashboard = () => {
    setView('dashboard');
    window.scrollTo(0, 0);
  };

  const resetToLanding = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  if (view === 'auth') {
    return (
      <AuthPage 
        onAuthSuccess={handleAuthSuccess} 
        onNavigateHome={resetToLanding} 
      />
    );
  }

  if (view === 'get-started') {
    return (
      <GetStartedPage 
        currentUser={currentUser} 
        onComplete={startProcessing} 
        onNavigateHome={resetToLanding} 
      />
    );
  }

  if (view === 'connecting') {
    return <ConnectingPage onComplete={showDashboard} />;
  }

  if (view === 'dashboard') {
    return (
      <DashboardPage 
        currentUser={currentUser} 
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-gray-900 dark:text-gray-100 selection:bg-indigo-600/30 selection:text-indigo-200 overflow-x-hidden font-sans transition-colors duration-300">
      {/* Global Vector Background Overlay: Adaptive Grid */}
      <div className="grid-overlay [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Navigation Header */}
      <Navbar 
        onStartConnecting={startOnboarding} 
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateTo={(targetView) => {
          setView(targetView);
          window.scrollTo(0, 0);
        }}
      />

      {/* Page Sections (Ordered logically for premium narrative) */}
      <main className="relative z-10">
        <Hero onStartConnecting={startOnboarding} />
        <Features />
        <Stats />
        <HowItWorks />
        <DashboardPreview />
        <Forecasting />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
