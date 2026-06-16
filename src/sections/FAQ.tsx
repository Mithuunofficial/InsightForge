import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../data/landingData';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-300">
      {/* Decorative Blur Blob */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800/30">
            Common Inquiries
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 font-sans text-sm sm:text-base"
          >
            Find answers to common questions about InsightForge features, security, models, and plans.
          </motion.p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openId === faq.id;
            
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-black/[0.02] dark:bg-white/[0.03] border-indigo-500/30 shadow-lg shadow-indigo-950/5 dark:shadow-indigo-950/20' 
                    : 'bg-black/[0.005] dark:bg-white/[0.01] border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10'
                }`}
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none cursor-pointer bg-transparent border-0"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-sm sm:text-base text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-200 pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : ''
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans border-t border-black/5 dark:border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
