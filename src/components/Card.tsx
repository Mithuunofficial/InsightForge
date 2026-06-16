import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. rgba(99, 102, 241, 0.15)
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  glowColor = "rgba(99, 102, 241, 0.08)",
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -6, 
        boxShadow: `0 20px 40px -15px ${glowColor}`
      }}
      className={`glass-card p-6 rounded-2xl border border-black/5 dark:border-white/5 transition-all duration-300 hover:border-black/15 dark:hover:border-white/20 ${className}`}
    >
      {children}
    </motion.div>
  );
};
