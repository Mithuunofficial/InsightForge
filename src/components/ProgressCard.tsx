import React from 'react';
import { motion } from 'framer-motion';

interface ProgressCardProps {
  progress: number;
  statusText: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ progress, statusText }) => {
  return (
    <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-6 space-y-4 shadow-xl">
      
      {/* Title / Percent Row */}
      <div className="flex justify-between items-center text-sm font-sans">
        <span className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          {statusText}
        </span>
        <span className="text-gray-900 dark:text-white font-bold text-lg tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 rounded-full bg-black/5 dark:bg-white/[0.04] overflow-hidden border border-black/5 dark:border-white/5 p-[1px]">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-600 border-glow shadow-[0_0_10px_rgba(99,102,241,0.3)]"
        />
      </div>

    </div>
  );
};
