import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, LineChart, Sparkles, TrendingUp } from 'lucide-react';

export const Forecasting: React.FC = () => {

  return (
    <section 
      id="forecasting" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-50 dark:from-[#030712] dark:via-indigo-950/15 dark:to-[#030712] border-t border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-violet/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text details */}
          <div className="lg:col-span-6 text-left space-y-6 md:space-y-8">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-800/30 text-xs font-semibold text-violet-750 dark:text-violet-300 uppercase tracking-wider">
              <Sparkles size={14} className="text-violet-600 dark:text-violet-400" />
              Machine Learning Engine
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
              Advanced Forecasting & <br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Predictive Intelligence
              </span>
            </h2>

            <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed text-base sm:text-lg font-light">
              Stop looking only at the rear-view mirror. InsightForge analyzes historical performance, filters out noise, detects seasonality, and simulates future revenue paths with high confidence.
            </p>

            {/* List of features */}
            <div className="space-y-4">
              
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white font-heading">AI-driven predictions</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-sans mt-1 leading-relaxed">
                    Uses neural networks (LSTM) to read seasonality, regional trends, and invoice spikes to project accurate paths.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white font-heading">Future trend analysis</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-sans mt-1 leading-relaxed">
                    Detects underlying growth velocities and market saturation milestones, alerting operations ahead of change.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 border border-violet-500/20">
                  <LineChart size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white font-heading">Revenue forecasting</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-sans mt-1 leading-relaxed">
                    Simulate best, expected, and worst-case sales pipelines, empowering finance to plan expenditures.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right SVG Graphic (Animated graph illustration) */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto">
            <div className="glass border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-2xl relative">
              
              {/* Graphic top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/5 mb-6 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Predictive Revenue Simulation</span>
                <span className="flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse"></span>
                  Active ML Model
                </span>
              </div>

              {/* SVG Graphic */}
              <svg 
                viewBox="0 0 500 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <defs>
                  {/* Grid pattern */}
                  <pattern id="grid-forecast" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-black/[0.04] dark:text-white/[0.03]" strokeWidth="1"/>
                  </pattern>
                  {/* Confidence Interval Gradient */}
                  <linearGradient id="confidenceGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.05} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.15} />
                  </linearGradient>
                  {/* Line gradients */}
                  <linearGradient id="histGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                  <linearGradient id="foreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                {/* Grid */}
                <rect width="500" height="260" fill="url(#grid-forecast)" />

                {/* Y-axis line */}
                <line x1="40" y1="10" x2="40" y2="260" stroke="currentColor" className="text-black/10 dark:text-white/10" strokeWidth="1"/>
                {/* X-axis line */}
                <line x1="40" y1="260" x2="480" y2="260" stroke="currentColor" className="text-black/10 dark:text-white/10" strokeWidth="1"/>

                {/* Shaded Confidence Interval Path */}
                <motion.path 
                  d="M 240 160 Q 340 100 460 70 L 460 150 Q 340 210 240 160 Z" 
                  fill="url(#confidenceGrad)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />

                {/* Historical Revenue Curve */}
                <motion.path 
                  d="M 40 220 C 80 230 120 180 160 190 C 200 200 220 150 240 160" 
                  stroke="url(#histGrad)" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />

                {/* Prediction boundary vertical dashed line */}
                <line x1="240" y1="10" x2="240" y2="260" stroke="currentColor" className="text-black/20 dark:text-white/20" strokeWidth="1" strokeDasharray="4 4"/>
                <text x="248" y="25" fill="currentColor" className="text-indigo-600 dark:text-indigo-300 font-sans" fontSize="9" fontWeight="semibold">TODAY</text>

                {/* Predicted Curve */}
                <motion.path 
                  d="M 240 160 Q 340 145 460 110" 
                  stroke="url(#foreGrad)" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  strokeDasharray="6 6"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                />

                {/* Points details */}
                <circle cx="240" cy="160" r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                <motion.circle 
                  cx="460" 
                  cy="110" 
                  r="5" 
                  fill="#06b6d4" 
                  stroke="#ffffff" 
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 1.6 }}
                />

                {/* Labels */}
                <text x="70" y="245" fill="currentColor" className="text-gray-500 dark:text-gray-400 font-sans" fontSize="10">Historical Data</text>
                <text x="310" y="195" fill="currentColor" className="text-indigo-600 dark:text-indigo-300 font-sans" fontSize="9">95% Confidence Interval</text>
                <text x="330" y="90" fill="currentColor" className="text-cyan-600 dark:text-cyan-400 font-sans font-semibold" fontSize="10">AI Prediction</text>

                {/* Axis indicators */}
                <text x="20" y="265" fill="currentColor" className="text-gray-400 dark:text-gray-500 font-sans" fontSize="9">Q3</text>
                <text x="235" y="275" fill="currentColor" className="text-gray-400 dark:text-gray-500 font-sans" fontSize="9">Q4</text>
                <text x="450" y="265" fill="currentColor" className="text-gray-400 dark:text-gray-500 font-sans" fontSize="9">Q1 (Forecast)</text>
              </svg>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
