import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

interface ProcessStepProps {
  label: string;
  status: 'incoming' | 'active' | 'completed';
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ label, status }) => {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
        isActive 
          ? 'bg-indigo-600/10 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
          : isCompleted 
            ? 'bg-black/[0.02] dark:bg-white/[0.02] border-emerald-500/20' 
            : 'bg-black/[0.01] dark:bg-white/[0.01] border-black/5 dark:border-white/5 opacity-50'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* State Indicator Icon */}
        <div className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
          isCompleted 
            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
            : isActive 
              ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
              : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-500'
        }`}>
          {isCompleted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Check size={14} strokeWidth={3} />
            </motion.div>
          ) : isActive ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
          )}
        </div>

        {/* Step Label */}
        <span className={`text-sm font-medium font-sans transition-colors duration-300 ${
          isActive 
            ? 'text-gray-900 dark:text-white font-semibold' 
            : isCompleted 
              ? 'text-gray-700 dark:text-gray-300' 
              : 'text-gray-500'
        }`}>
          {label}
        </span>
      </div>

      {/* Active step gradient highlight indicator */}
      {isActive && (
        <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-2 py-0.5 rounded-full animate-pulse uppercase tracking-wider">
          Processing
        </span>
      )}
      {isCompleted && (
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
          Ready
        </span>
      )}
    </motion.div>
  );
};
