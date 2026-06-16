import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingAnimation } from '../components/LoadingAnimation';
import { ProcessStep } from '../components/ProcessStep';
import { ProgressCard } from '../components/ProgressCard';
import { StatsCard } from '../components/StatsCard';
import { 
  Database, 
  Grid, 
  BarChart, 
  Percent, 
  Clock, 
  ArrowRight, 
  Sparkles,
  CheckCircle 
} from 'lucide-react';


interface ConnectingPageProps {
  onComplete: () => void;
}

export const ConnectingPage: React.FC<ConnectingPageProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 9000; // 9 seconds total loading
    const intervalTime = 50;
    const increment = (100 / totalDuration) * intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const isDone = progress >= 100;

  // Update status labels based on progress
  let statusText = 'Ingesting CSV dataset...';
  if (progress < 15) {
    statusText = 'Ingesting CSV dataset...';
  } else if (progress >= 15 && progress < 30) {
    statusText = 'Parsing headers & cleaning types...';
  } else if (progress >= 30 && progress < 45) {
    statusText = 'Fixing missing data and duplicates...';
  } else if (progress >= 45 && progress < 65) {
    statusText = 'Extracting sales seasonality and KPIs...';
  } else if (progress >= 65 && progress < 80) {
    statusText = 'Generating graphic charts & panels...';
  } else if (progress >= 80 && progress < 100) {
    statusText = 'Running LSTM neural forecast models...';
  } else {
    statusText = 'Processing complete.';
  }

  // Determine status of each of the 6 steps
  const getStepStatus = (stepIndex: number) => {
    // Step ranges
    const ranges = [
      { start: 0, end: 15 },   // Step 1: Upload Complete
      { start: 16, end: 30 },  // Step 2: Validating Dataset
      { start: 31, end: 45 },  // Step 3: Cleaning Missing Values
      { start: 46, end: 65 },  // Step 4: Detecting Sales Patterns
      { start: 66, end: 80 },  // Step 5: Generating Charts
      { start: 81, end: 99 },  // Step 6: Preparing Forecast Models
    ];

    const range = ranges[stepIndex];
    if (progress > range.end) {
      return 'completed';
    } else if (progress >= range.start && progress <= range.end) {
      return 'active';
    } else {
      return 'incoming';
    }
  };

  const steps = [
    'Upload Complete',
    'Validating Dataset',
    'Cleaning Missing Values',
    'Detecting Sales Patterns',
    'Generating Charts',
    'Preparing Forecast Models',
  ];

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none transition-colors duration-300">
      
      {/* Dynamic Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-indigo/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-violet/10 rounded-full filter blur-3xl pointer-events-none"></div>
      
      {/* Grid Overlay */}
      <div className="grid-overlay [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Loading progress and states (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left max-w-2xl mx-auto lg:mx-0 w-full">
          
          {/* Logo animation and title */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <LoadingAnimation />
            <div className="text-center sm:text-left space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/30 text-xs font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-wider">
                <Sparkles size={12} className="text-indigo-500 dark:text-indigo-400" />
                AI Pipeline Active
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                Forging Insights From Your Data
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed max-w-lg">
                Please wait while InsightForge securely processes your dataset, eliminates duplicates, builds indicators, and generates predictive forecasting models.
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key="loading-container"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 w-full"
              >
                {/* Progress bar */}
                <ProgressCard progress={progress} statusText={statusText} />

                {/* Processing Steps list */}
                <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-5 md:p-6 space-y-3 shadow-xl">
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest font-sans">
                    Pipeline Execution Stages
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {steps.map((step, idx) => (
                      <ProcessStep 
                        key={`step-list-${idx}`} 
                        label={step} 
                        status={getStepStatus(idx)} 
                      />
                    ))}
                  </div>
                </div>

                {/* Grid of live stats countups */}
                <div className="grid grid-cols-2 gap-4">
                  <StatsCard 
                    title="Rows Ingested" 
                    value={45280} 
                    icon={Database} 
                    iconColorClass="text-cyan-600 dark:text-cyan-400" 
                  />
                  <StatsCard 
                    title="Data Dimensions" 
                    value={14} 
                    suffix=" columns" 
                    icon={Grid} 
                    iconColorClass="text-indigo-600 dark:text-indigo-400" 
                  />
                  <StatsCard 
                    title="Dashboards Rendering" 
                    value={8} 
                    icon={BarChart} 
                    iconColorClass="text-violet-600 dark:text-violet-400" 
                  />
                  <StatsCard 
                    title="Forecast Conf." 
                    value={94.8} 
                    decimals={1} 
                    suffix="%" 
                    icon={Percent} 
                    iconColorClass="text-emerald-600 dark:text-emerald-400" 
                  />
                </div>

                {/* Est time card and Privacy badge row */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-black/5 dark:border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-indigo-500 dark:text-indigo-400" />
                    <span>Average processing time: <strong>5–10 seconds</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">🔒</span>
                    <span>Your data remains private and processed securely.</span>
                  </div>
                </div>

              </motion.div>
            ) : (
              // Success layout transition
              <motion.div
                key="success-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="glass border border-emerald-500/30 rounded-2xl p-8 text-center space-y-6 shadow-2xl shadow-emerald-950/10 dark:shadow-emerald-950/50 w-full border-glow"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shadow-lg shadow-emerald-500/20">
                    <CheckCircle size={36} />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">Analysis Completed Successfully</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-sans max-w-md">
                    All 45,280 rows have been formatted, seasonal charts computed, and LSTM predictions compiled. Your dashboard workspace is ready.
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col items-center justify-center space-y-4">
                  <button
                    onClick={onComplete}
                    className="group relative inline-flex items-center justify-center py-3.5 px-10 rounded-full font-bold text-sm tracking-wide bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20 transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                  >
                    Open Dashboard
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                  </button>
                  <span className="text-xs text-gray-500 font-sans">
                    Secure workspace loaded. No files are shared with third parties.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Right Side: Futuristic interactive node link visual (5 cols on desktop) */}
        <div className="hidden lg:col-span-5 w-full flex items-center justify-center">
          <div className="glass border border-black/10 dark:border-white/10 rounded-2xl p-6 w-full max-w-md h-[480px] shadow-2xl relative flex flex-col justify-between overflow-hidden">
            
            {/* Overlay Grid inside */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.06)_1.5px,transparent_1.5px)] bg-[size:1.5rem_1.5rem] pointer-events-none"></div>

            {/* Visual Header */}
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-sans tracking-widest border-b border-white/5 pb-3 relative z-10">
              <span>NEURAL MAPPING ENGINE</span>
              <span className="text-cyan-400 uppercase">Interactive Node Map</span>
            </div>

            {/* Vector Nodes SVG canvas */}
            <div className="flex-1 relative flex items-center justify-center">
              <svg 
                viewBox="0 0 400 350" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full relative z-10"
              >
                <defs>
                  {/* Glowing neon filters */}
                  <filter id="glow-neon" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="vectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>

                {/* Animated Glowing Connection Lines */}
                {/* Line: Ingest (60,180) -> Clean (160,100) */}
                <path d="M 60 180 Q 110 140 160 100" stroke="url(#vectorGrad)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.3" />
                
                {/* Line: Ingest (60,180) -> Analytics (160,260) */}
                <path d="M 60 180 Q 110 220 160 260" stroke="url(#vectorGrad)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.3" />

                {/* Line: Clean (160,100) -> ML Forecast (280,180) */}
                <path d="M 160 100 Q 220 140 280 180" stroke="url(#vectorGrad)" strokeWidth="1.5" opacity="0.4" />
                
                {/* Line: Analytics (160,260) -> ML Forecast (280,180) */}
                <path d="M 160 260 Q 220 220 280 180" stroke="url(#vectorGrad)" strokeWidth="1.5" opacity="0.4" />

                {/* Line: ML Forecast (280,180) -> Insights (340,180) */}
                <line x1="280" y1="180" x2="340" y2="180" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />

                {/* Flying animated packets along lines */}
                <circle r="3" fill="#06b6d4" filter="url(#glow-neon)">
                  <animateMotion 
                    dur="3s" 
                    repeatCount="indefinite" 
                    path="M 60 180 Q 110 140 160 100" 
                  />
                </circle>

                <circle r="3" fill="#7c3aed" filter="url(#glow-neon)">
                  <animateMotion 
                    dur="4s" 
                    repeatCount="indefinite" 
                    path="M 160 260 Q 220 220 280 180" 
                  />
                </circle>

                <circle r="3" fill="#e879f9" filter="url(#glow-neon)">
                  <animateMotion 
                    dur="2.5s" 
                    repeatCount="indefinite" 
                    path="M 160 100 Q 220 140 280 180" 
                  />
                </circle>

                {/* Nodes with pulsing animations */}
                {/* Node 1: CSV Source */}
                <g className="cursor-pointer">
                  <circle cx="60" cy="180" r="14" fill="#030712" stroke="#06b6d4" strokeWidth="2" />
                  <circle cx="60" cy="180" r="6" fill="#06b6d4" className="animate-pulse" />
                </g>

                {/* Node 2: Clean Engine */}
                <g>
                  <circle cx="160" cy="100" r="16" fill="#030712" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="160" cy="100" r="7" fill="#3b82f6" className="animate-pulse" />
                </g>

                {/* Node 3: Analytics Compiler */}
                <g>
                  <circle cx="160" cy="260" r="16" fill="#030712" stroke="#4f46e5" strokeWidth="2" />
                  <circle cx="160" cy="260" r="7" fill="#4f46e5" className="animate-pulse" />
                </g>

                {/* Node 4: Forecasting ML */}
                <g>
                  <circle cx="280" cy="180" r="18" fill="#030712" stroke="#7c3aed" strokeWidth="2" />
                  <circle cx="280" cy="180" r="8" fill="#7c3aed" className="animate-pulse" />
                </g>

                {/* Node 5: Target Output */}
                <g>
                  <circle cx="340" cy="180" r="12" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                  <circle cx="340" cy="180" r="5" fill="#10b981" />
                </g>

                {/* Floating mini charts / metrics representations */}
                <foreignObject x="30" y="30" width="100" height="50">
                  <div className="glass-card border border-white/5 rounded-lg p-1.5 text-[9px] font-sans scale-90 opacity-70">
                    <span className="text-gray-500 font-bold block">CSV Ingestion</span>
                    <span className="text-cyan-400 font-mono font-bold">45.2K Rows</span>
                  </div>
                </foreignObject>

                <foreignObject x="270" y="240" width="100" height="50">
                  <div className="glass-card border border-white/5 rounded-lg p-1.5 text-[9px] font-sans scale-90 opacity-70">
                    <span className="text-gray-500 font-bold block">AI Seasonality</span>
                    <span className="text-violet-400 font-mono font-bold">LSTM Active</span>
                  </div>
                </foreignObject>

              </svg>
            </div>

            {/* Visual Footer summary */}
            <div className="relative z-10 border-t border-white/5 pt-3 text-[10px] text-gray-400 text-left font-sans flex items-center justify-between">
              <span>Model Confidence: <strong>94.8%</strong></span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Secure Process
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
