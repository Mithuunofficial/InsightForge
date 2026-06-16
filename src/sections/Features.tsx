import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { featuresData } from '../data/landingData';
import * as Icons from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-black/[0.01] dark:bg-gray-950/20 border-t border-black/5 dark:border-white/5 transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 font-sans"
          >
            Everything you need to transform messy spreadsheet records into clean, interactive business intelligence reports.
          </motion.p>
        </div>

        {/* Feature Cards Grid (Exactly 6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature, index) => {
            // Dynamically load the Lucide icon
            const IconComponent = (Icons as any)[feature.icon] || Icons.HelpCircle;

            // Generate unique card glows
            const glowColors = [
              "rgba(6, 182, 212, 0.1)",  // Cyan
              "rgba(99, 102, 241, 0.1)",  // Indigo
              "rgba(124, 58, 237, 0.1)",  // Violet
              "rgba(59, 130, 246, 0.1)",  // Blue
              "rgba(139, 92, 246, 0.1)",  // Purple
              "rgba(20, 184, 166, 0.1)",  // Teal
            ];
            
            return (
              <Card 
                key={feature.id} 
                glowColor={glowColors[index % glowColors.length]}
                delay={index * 0.1}
                className="flex flex-col text-left space-y-4"
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border bg-black/[0.02] dark:bg-white/[0.02] ${
                  index % 3 === 0 ? 'text-cyan-600 dark:text-cyan-400 border-cyan-500/20' : 
                  index % 3 === 1 ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500/20' : 
                  'text-violet-600 dark:text-violet-400 border-violet-500/20'
                }`}>
                  <IconComponent size={24} />
                </div>
                
                {/* Content */}
                <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-sans text-sm leading-relaxed flex-1">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
