import React from 'react';
import { motion } from 'framer-motion';
import { pricingPlans } from '../data/landingData';
import { Check } from 'lucide-react';

interface PricingProps {
  onStartConnecting?: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onStartConnecting }) => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#030712] border-t border-white/5">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-violet/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-800/30">
            Fair Pricing
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Flexible Plans For Every Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 font-sans"
          >
            Scale up as your data volume grows. No hidden fees or surprise overages.
          </motion.p>
        </div>

        {/* Pricing Cards Grid (Exactly 3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular 
                  ? 'glass border-indigo-500/50 shadow-xl shadow-indigo-950/30 scale-105 z-10 border-glow' 
                  : 'glass-card border-white/5 shadow-md hover:border-white/20'
              }`}
            >
              {/* Popular ribbon */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-[10px] font-bold tracking-wider text-white uppercase shadow-md shadow-indigo-500/20">
                  Most Popular
                </span>
              )}

              {/* Top details */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-gray-400 font-sans mt-2 min-h-[40px]">{plan.description}</p>
                </div>

                {/* Price display */}
                <div className="flex items-baseline text-white">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="ml-1 text-sm font-semibold text-gray-400">
                      /{plan.period}
                    </span>
                  )}
                </div>

                {/* Bullet checklist */}
                <ul className="space-y-4 pt-4 border-t border-white/5 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={`${plan.id}-feat-${idx}`} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 p-0.5 rounded-full mt-0.5 ${
                        plan.popular ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-cyan-400'
                      }`}>
                        <Check size={14} />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300 font-sans leading-normal">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => {
                    if (onStartConnecting) {
                      onStartConnecting();
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

