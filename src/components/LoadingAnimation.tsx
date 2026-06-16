import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-40 h-40 select-none">
      
      {/* Rotating outer glow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear"
        }}
        className="absolute w-36 h-36 rounded-full border border-dashed border-indigo-500/20 bg-gradient-to-tr from-transparent via-cyan-500/5 to-indigo-500/10 filter blur-[1px]"
      />

      {/* Pulsing Concentric Ring 1 */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.4, 0.15]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
        className="absolute w-32 h-32 rounded-full border border-indigo-500/30 bg-indigo-500/5 filter blur-[4px]"
      />

      {/* Pulsing Concentric Ring 2 */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
        className="absolute w-24 h-24 rounded-full border border-cyan-500/20 bg-cyan-500/5 filter blur-[2px]"
      />

      {/* Float & Glow Logo wrapper */}
      <motion.div
        animate={{
          y: [-4, 4, -4]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
        className="relative z-10 flex items-center justify-center p-4 rounded-full bg-white dark:bg-slate-950 border border-black/10 dark:border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.25)]"
      >
        <Logo size={64} />
      </motion.div>

    </div>
  );
};
