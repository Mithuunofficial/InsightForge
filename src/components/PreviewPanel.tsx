import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Database, Sparkles, LayoutGrid } from 'lucide-react';

interface PreviewPanelProps {
  hasFile: boolean;
  fileName?: string;
  rowsCount?: number;
  selectedColumns?: {
    date: string;
    product: string;
    category: string;
    region: string;
    sales: string;
    quantity: string;
  };
}

// Mini preview chart data
const previewChartData = [
  { name: 'W1', revenue: 24000 },
  { name: 'W2', revenue: 35000 },
  { name: 'W3', revenue: 30000 },
  { name: 'W4', revenue: 47000 },
];

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  hasFile,
  fileName = "",
  rowsCount = 0,
  selectedColumns
}) => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="glass border border-black/10 dark:border-white/10 rounded-2xl p-5 md:p-6 h-[520px] shadow-2xl relative flex flex-col justify-between overflow-hidden text-left w-full max-w-sm lg:max-w-none">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"></div>

      <div className="absolute top-2 right-4 flex gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-indigo-500/30"></span>
        <span className="w-2 h-2 rounded-full bg-cyan-500/30"></span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-gray-400 font-sans tracking-widest border-b border-black/5 dark:border-white/5 pb-3 relative z-10">
        <span>PREVIEW PANEL</span>
        <span className="text-indigo-600 dark:text-indigo-400 uppercase font-bold">Dynamic Sync</span>
      </div>

      <AnimatePresence mode="wait">
        {!hasFile ? (
          // Empty State / Loading Skeletons
          <motion.div
            key="empty-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center items-center text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex items-center justify-center text-gray-500 relative">
              <Database size={28} />
              <div className="absolute inset-0 rounded-2xl border border-dashed border-gray-500/30 dark:border-gray-600/30 animate-spin" style={{ animationDuration: '8s' }}></div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white font-heading">No dataset uploaded yet.</h4>
              <p className="text-xs text-gray-600 dark:text-gray-450 font-sans max-w-[200px] leading-relaxed">
                Upload your CSV file in Step 1 to initialize the live metrics preview pipeline.
              </p>
            </div>

            {/* Pulsing Loading Skeletons */}
            <div className="w-full space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
              <div className="h-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-14 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-lg w-full animate-pulse"></div>
              <div className="h-10 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-lg w-1/2 animate-pulse"></div>
            </div>
          </motion.div>
        ) : (
          // Filled State: Real Metrics
          <motion.div
            key="filled-preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between pt-6 space-y-6 relative z-10"
          >
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Metric 1 */}
              <div className="bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-3">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider block font-sans">Gross sales</span>
                <span className="text-base font-bold text-gray-900 dark:text-white font-sans mt-0.5 block">$136,000</span>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">&uarr; +14.8%</span>
              </div>

              {/* Metric 2 */}
              <div className="bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-3">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider block font-sans">Cleaned Rows</span>
                <span className="text-base font-bold text-gray-900 dark:text-white font-sans mt-0.5 block">45,280</span>
                <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-semibold block mt-0.5">100% Parsed</span>
              </div>

            </div>

            {/* Selected mapping indicators */}
            <div className="bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-4 space-y-2.5 text-xs">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block font-sans">Column Mapping Status</span>
              
              <div className="space-y-1.5 font-sans text-gray-700 dark:text-gray-300">
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                  <span className="text-gray-500">Date index:</span>
                  <span className="font-semibold">{selectedColumns?.date || 'Auto-detected'}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                  <span className="text-gray-500">Revenue:</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">{selectedColumns?.sales || 'Auto-detected'}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                  <span className="text-gray-500">Region:</span>
                  <span className="font-semibold">{selectedColumns?.region || 'Auto-detected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rows Count:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{rowsCount.toLocaleString()}</span>
                </div>

              </div>
            </div>

            {/* Mini visual chart rendering */}
            <div className="bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-3 flex flex-col h-[180px] justify-between">
              <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Simulated Weekly Revenue</span>
                <span className="flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
                  <Sparkles size={10} className="animate-pulse" /> AI Sync
                </span>
              </div>
              
              <div className="flex-1 min-h-0 w-full pt-4">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={previewChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="prevPreviewGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke={isDark ? '#4b5563' : '#64748b'} fontSize={9} tickLine={false} />
                      <YAxis stroke={isDark ? '#4b5563' : '#64748b'} fontSize={9} tickLine={false} />
                      <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#prevPreviewGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer message */}
      <div className="border-t border-black/5 dark:border-white/5 pt-3 relative z-10 text-[10px] text-gray-500 font-sans flex items-center justify-between">
        <span className="flex items-center gap-1">
          <LayoutGrid size={12} className="text-indigo-600 dark:text-indigo-400" />
          <span>Active File: <strong>{fileName || 'None'}</strong></span>
        </span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">🔒 Encrypted</span>
      </div>

    </div>
  );
};
