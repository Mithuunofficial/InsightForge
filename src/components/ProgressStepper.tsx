import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressStepperProps {
  currentStep: number; // 1 to 6
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  const steps = [
    'Upload',
    'Configure',
    'Analytics',
    'Forecasting',
    'Review',
    'Complete'
  ];

  return (
    <div className="w-full relative py-6">
      
      {/* Horizontal connector path */}
      <div className="absolute top-[34px] left-[6%] right-[6%] h-0.5 bg-black/5 dark:bg-white/[0.04] z-0">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / 5) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Stepper nodes row */}
      <div className="flex justify-between items-center relative z-10">
        {steps.map((label, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={`step-node-${idx}`} className="flex flex-col items-center space-y-2.5">
              
              {/* Stepper bubble */}
              <div className="relative">
                {isActive && (
                  <motion.span 
                    layoutId="stepper-glow"
                    className="absolute inset-[-4px] rounded-full bg-indigo-500/20 border border-indigo-500/40 filter blur-[2px] animate-pulse"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-wide border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                    : isActive 
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-600 dark:text-white shadow-lg shadow-indigo-500/30' 
                      : 'bg-white dark:bg-gray-950 border-black/5 dark:border-white/5 text-gray-400 dark:text-gray-500'
                }`}>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <span>0{stepNumber}</span>
                  )}
                </div>
              </div>

              {/* Step label text */}
              <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider font-sans transition-colors duration-300 ${
                isActive 
                  ? 'text-gray-900 dark:text-white' 
                  : isCompleted 
                    ? 'text-gray-600 dark:text-gray-300' 
                    : 'text-gray-400 dark:text-gray-500'
              }`}>
                {label}
              </span>

            </div>
          );
        })}
      </div>

    </div>
  );
};
