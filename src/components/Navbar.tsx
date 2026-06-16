import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onStartConnecting?: () => void;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
  onNavigateTo?: (view: 'landing' | 'auth' | 'get-started' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onStartConnecting, 
  currentUser, 
  onLogout,
  onNavigateTo
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // ScrollSpy logic to detect active section
      const sections = ['hero', 'features', 'dashboard-preview', 'forecasting', 'faq'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section is in the middle viewport focus range
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Features', href: '#features', id: 'features' },
    { name: 'Analytics', href: '#dashboard-preview', id: 'dashboard-preview' },
    { name: 'Forecasting', href: '#forecasting', id: 'forecasting' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigateTo) {
      onNavigateTo('landing');
    }
    // Wait for view update to trigger scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass-nav py-3 shadow-lg shadow-black/5 dark:shadow-black/20' 
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}>
              <Logo size={42} className="transform group-hover:scale-105 transition-transform duration-300" />
              <span className="font-heading font-bold text-xl tracking-tight bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-600 dark:from-white dark:via-indigo-200 dark:to-indigo-400 bg-clip-text text-transparent group-hover:text-indigo-600 dark:group-hover:text-white transition-colors duration-300">
                InsightForge
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 shadow-[0_0_10px_rgba(99,102,241,0.05)]' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right side controls */}
            <div className="hidden lg:flex items-center gap-4 relative">
              {currentUser ? (
                <>
                  {/* User Profile Avatar with Dropdown */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm tracking-wide transition-all cursor-pointer select-none"
                  >
                    {getInitials(currentUser.name)}
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <>
                        {/* Overlay to close */}
                        <div 
                          className="fixed inset-0 z-40 cursor-default" 
                          onClick={() => setDropdownOpen(false)}
                        ></div>

                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-12 z-50 w-56 glass border border-black/10 dark:border-white/10 rounded-2xl shadow-xl p-4 text-left font-sans"
                        >
                          <div className="border-b border-black/5 dark:border-white/5 pb-2.5 mb-2.5">
                            <span className="text-xs font-bold text-gray-900 dark:text-white block truncate">{currentUser.name}</span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 block truncate">{currentUser.email}</span>
                          </div>

                          <div className="space-y-1">
                            <button
                              onClick={() => {
                                setDropdownOpen(false);
                                if (onNavigateTo) onNavigateTo('dashboard');
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-left"
                            >
                              <LayoutDashboard size={14} />
                              <span>Go to Dashboard</span>
                            </button>

                            <button
                              onClick={() => {
                                setDropdownOpen(false);
                                if (onNavigateTo) onNavigateTo('get-started');
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-left"
                            >
                              <Sparkles size={14} />
                              <span>Analyze Dataset</span>
                            </button>

                            <button
                              onClick={() => {
                                setDropdownOpen(false);
                                if (onLogout) onLogout();
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-650 hover:text-red-500 hover:bg-red-500/10 cursor-pointer text-left"
                            >
                              <LogOut size={14} />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <>
                  {/* Sign In CTA */}
                  <button
                    onClick={() => {
                      if (onNavigateTo) onNavigateTo('auth');
                    }}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full cursor-pointer transition-colors"
                  >
                    Sign In
                  </button>

                  {/* Get Started CTA */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (onStartConnecting) {
                        onStartConnecting();
                      } else if (onNavigateTo) {
                        onNavigateTo('auth');
                      }
                    }}
                    className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-full group bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 group-hover:from-cyan-500 group-hover:to-purple-600 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-indigo-800 cursor-pointer"
                  >
                    <span className="relative px-5 py-2.5 transition-all duration-200 bg-gray-950 dark:bg-gray-950 rounded-full group-hover:bg-opacity-0">
                      Get Started
                    </span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-md focus:outline-none"
                aria-label="Open main menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass border-t border-black/5 dark:border-white/5 bg-white/95 dark:bg-gray-950/95 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      className={`block px-3 py-3 rounded-md text-base font-semibold transition-all duration-200 ${
                        isActive 
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10' 
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
                
                <div className="pt-4 pb-2 border-t border-black/10 dark:border-white/10 px-3 space-y-3">
                  {currentUser ? (
                    <div className="space-y-2">
                      <div className="px-3 py-1 text-left">
                        <span className="text-sm font-bold text-gray-900 dark:text-white block truncate">{currentUser.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block truncate">{currentUser.email}</span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onNavigateTo) onNavigateTo('dashboard');
                        }}
                        className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-full border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-semibold cursor-pointer text-sm"
                      >
                        <LayoutDashboard size={16} />
                        <span>Go to Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-full bg-red-500/10 text-red-650 hover:bg-red-500/20 font-semibold cursor-pointer text-sm"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onNavigateTo) onNavigateTo('auth');
                        }}
                        className="w-full py-3 px-4 rounded-full border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-350 hover:text-gray-900 dark:hover:text-white font-semibold cursor-pointer text-sm"
                      >
                        Sign In
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileMenuOpen(false);
                          if (onStartConnecting) {
                            onStartConnecting();
                          } else if (onNavigateTo) {
                            onNavigateTo('auth');
                          }
                        }}
                        className="w-full flex items-center justify-center py-3 px-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/20 cursor-pointer"
                      >
                        Get Started
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

