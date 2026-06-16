import React from 'react';
import { motion } from 'framer-motion';
import { stepsData } from '../data/landingData';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-300">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-violet/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800/30">
            Simple Workflow
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 font-sans"
          >
            Go from raw spreadsheet logs to predictive dashboard insights in four simple steps.
          </motion.p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative">
          
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[58px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 opacity-30"></div>

          {/* Connecting Line for Mobile */}
          <div className="lg:hidden absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-violet-500 opacity-20"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-6 relative">
            {stepsData.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group relative"
              >
                {/* Node bubble */}
                <div className="flex-shrink-0 z-10 mr-6 lg:mr-0 lg:mb-6">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-bold text-sm tracking-wide bg-white dark:bg-gray-950 border-2 transition-all duration-300 shadow-md group-hover:scale-110 group-hover:border-glow border-indigo-500 text-indigo-600 dark:text-indigo-300">
                    {step.number}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 lg:px-4">
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-3 leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
