import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Logo } from '../components/Logo';
import { registerUser, loginUser } from '../services/authService';
import { saveUser } from '../services/userService';


import type { User as AppUser } from '../types';

interface AuthPageProps {
  onAuthSuccess: (user: AppUser) => void;
  onNavigateHome: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onNavigateHome, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleToggleMode = () => {
    setMode(prev => prev === 'signin' ? 'signup' : 'signin');
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name) {
          setError('Please enter your name.');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }

        // Register user via Auth service
        const appUser = await registerUser(email, password, name);
        
        // Save user profile in Firestore
        try {
          await saveUser(appUser);
        } catch (dbErr) {
          console.warn('Firestore database save failed, proceeding with auth profile:', dbErr);
        }

        setSuccess('Account created successfully! Logging you in...');
        
        setTimeout(() => {
          setLoading(false);
          onAuthSuccess(appUser);
        }, 1000);

      } else {
        // Sign In via Auth service
        const appUser = await loginUser(email, password);

        setSuccess(`Welcome back, ${appUser.name}!`);

        setTimeout(() => {
          setLoading(false);
          onAuthSuccess(appUser);
        }, 1000);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      // Map standard Firebase Auth error codes to helpful messages
      let message = 'An error occurred during authentication. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        message = 'Invalid email or password. Please try again.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password must be at least 6 characters long.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center font-sans overflow-x-hidden selection:bg-indigo-600/30 selection:text-indigo-200 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background vector overlays */}
      <div className="grid-overlay [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)]"></div>
      
      {/* Back button */}
      <button 
        onClick={onNavigateHome}
        className="absolute top-6 left-4 sm:left-8 flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer group py-2 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
      >
        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      {/* Decorative top blobs */}
      <div className="absolute top-1/10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-cyan-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <button onClick={onNavigateHome} className="flex items-center gap-2 group bg-transparent border-0 p-0 cursor-pointer">
            <Logo size={48} className="transform group-hover:scale-105 transition-transform duration-300" />
            <span className="font-heading font-bold text-2xl text-gray-900 dark:text-white tracking-tight">InsightForge</span>
          </button>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">
              {mode === 'signin' ? 'Sign in to your workspace' : 'Create your Forge account'}
            </h2>
            <p className="text-xs text-gray-450 dark:text-gray-400 font-sans max-w-xs leading-relaxed">
              {mode === 'signin' 
                ? 'Access your analytics dashboards and prediction models.' 
                : 'Start processing sales reports with neural network forecasting.'}
            </p>
          </div>
        </div>

        {/* Auth Card Container */}
        <div className="glass border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full filter blur-xl"></div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="signup-name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1.5"
                >
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-sans block text-left">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-black/[0.04] dark:focus:bg-white/[0.04] transition-all duration-200"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-sans block text-left">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="jane.doe@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-black/[0.04] dark:focus:bg-white/[0.04] transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-sans block text-left">
                  Password
                </label>
                {mode === 'signin' && (
                  <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                    Forgot Password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-black/[0.04] dark:focus:bg-white/[0.04] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="signup-confirm-password-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1.5"
                >
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-sans block text-left">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-black/[0.04] dark:focus:bg-white/[0.04] transition-all duration-200"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-600 dark:text-red-400 text-left font-sans"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 text-left font-sans animate-pulse"
                >
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative inline-flex items-center justify-center py-3 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-650 hover:from-cyan-400 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20 transform hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In' : 'Create Workspace Account'}</span>
                  <Sparkles size={14} className="ml-2 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/5 flex items-center justify-center text-xs text-gray-500 font-sans gap-1.5">
            <span>
              {mode === 'signin' ? "Don't have an account?" : 'Already registered?'}
            </span>
            <button
              onClick={handleToggleMode}
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer bg-transparent border-0 p-0 font-sans"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>

        {/* Security / Privacy notice */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-450 dark:text-gray-500 font-sans uppercase mt-6 tracking-wide">
          <ShieldCheck size={14} className="text-emerald-500/70" />
          <span>Local TLS 1.3 Client Security Encryption</span>
        </div>

      </div>
    </div>
  );
};
