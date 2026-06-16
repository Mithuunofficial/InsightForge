import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { statsData } from '../data/landingData';

export const Stats: React.FC = () => {
  return (
    <section 
      id="stats" 
      className="py-20 relative bg-gradient-to-b from-gray-50/40 to-slate-100/40 dark:from-gray-950/40 dark:to-[#030712] border-y border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Grid layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-2"
            >
              {/* Statistic Value */}
              <div className="text-4xl sm:text-5xl font-extrabold font-sans text-white tracking-tight flex items-center justify-center">
                <span className="bg-gradient-to-r from-cyan-600 via-indigo-500 to-violet-600 dark:from-cyan-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
                  <AnimatedNumber 
                    value={stat.value} 
                    decimals={stat.value === 99.9 ? 1 : 0} 
                  />
                  {stat.suffix}
                </span>
              </div>
              
              {/* Statistic Label */}
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
