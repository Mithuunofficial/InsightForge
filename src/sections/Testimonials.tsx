import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { testimonialsData } from '../data/landingData';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-gray-950/20 border-t border-white/5">
      {/* Background Blob */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-indigo/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-800/30">
            Social Proof
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 font-sans"
          >
            Loved by operations executives, BI analyst leads, and founders worldwide.
          </motion.p>
        </div>

        {/* Testimonials Grid (Exactly 3 Unique items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              glowColor="rgba(124, 58, 237, 0.08)"
              delay={index * 0.15}
              className="flex flex-col justify-between text-left h-full"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#eab308" className="text-yellow-500" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm sm:text-base text-gray-300 font-sans italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* User profile */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-white/5">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-heading text-sm font-bold text-white">{testimonial.name}</h4>
                  <p className="text-xs text-gray-400 font-sans">
                    {testimonial.role}, <span className="text-indigo-400">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
