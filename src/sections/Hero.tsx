import React from 'react';
import { motion } from 'framer-motion';
import { DashboardMockup } from '../components/DashboardMockup';
import { ShieldCheck, CreditCard, Zap } from 'lucide-react';

interface HeroProps {
  onStartConnecting?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartConnecting }) => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden min-h-screen flex items-center"
    >
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-brand-indigo/15 rounded-full filter blur-3xl animate-blob-1 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-violet/15 rounded-full filter blur-3xl animate-blob-2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 text-left space-y-6 md:space-y-8">
            
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-black/10 dark:border-white/10 text-sm font-semibold text-indigo-600 dark:text-indigo-300"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              Smart Analytics • Powerful Insights
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1]"
            >
              Transform Sales Data Into <br className="hidden md:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent text-glow">
                Actionable Insights
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl font-sans font-light leading-relaxed"
            >
              Upload CSV files, analyze trends, visualize performance, and predict future sales with AI-powered analytics. No coding required.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
            >
              <button
                onClick={() => {
                  if (onStartConnecting) {
                    onStartConnecting();
                  } else {
                    handleScroll('#hero');
                  }
                }}
                className="py-3 px-8 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-medium shadow-lg shadow-indigo-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center cursor-pointer"
              >
                Get Started Free
              </button>
              
              {/* <button
                onClick={() => handleScroll('#dashboard-preview')}
                className="py-3 px-6 rounded-full glass hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-white font-medium border border-black/10 dark:border-white/10 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <Play size={16} fill="currentColor" className="text-gray-800 dark:text-white" />
                View Live Demo
              </button> */}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-400 border-t border-black/5 dark:border-white/5"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-cyan-400" />
                <span>Secure Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CreditCard size={16} className="text-indigo-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={16} className="text-violet-400" />
                <span>Fast Processing</span>
              </div>
            </motion.div>

          </div>

          {/* Right Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
            className="lg:col-span-6 w-full max-w-2xl mx-auto lg:max-w-none"
          >
            <DashboardMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
