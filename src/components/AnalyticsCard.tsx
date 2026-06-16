import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, PieChart, Users, Compass, Calendar, Check } from 'lucide-react';

export interface AnalyticsOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export const analyticsOptions: AnalyticsOption[] = [
  {
    id: "revenue-analysis",
    title: "Revenue Analysis",
    description: "Track gross/net sales, deal velocity, and recurring transaction volumes.",
    icon: TrendingUp
  },
  {
    id: "product-perf",
    title: "Product Performance",
    description: "Identify high-margin SKUs, monitor product velocity, and analyze units sold.",
    icon: BarChart3
  },
  {
    id: "category-insights",
    title: "Category Insights",
    description: "Group sales details by department, billing tier, or product categories.",
    icon: PieChart
  },
  {
    id: "customer-insights",
    title: "Customer Insights",
    description: "Measure average customer lifecycle spending, retention, and order spacing.",
    icon: Users
  },
  {
    id: "regional-analysis",
    title: "Regional Analysis",
    description: "Segment conversion volumes by cities, shipping regions, or currencies.",
    icon: Compass
  },
  {
    id: "monthly-trends",
    title: "Monthly Trends",
    description: "Detect month-over-month peaks, sales seasonality, and cyclical dips.",
    icon: Calendar
  }
];

interface AnalyticsCardProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ selectedIds, onToggle }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {analyticsOptions.map((opt) => {
        const isSelected = selectedIds.includes(opt.id);
        const Icon = opt.icon;

        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            whileHover={{ scale: 1.01, y: -2 }}
            className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 w-full cursor-pointer relative overflow-hidden ${
              isSelected 
                ? 'bg-indigo-600/10 border-indigo-500/40 shadow-lg' 
                : 'bg-black/[0.01] dark:bg-white/[0.01] border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
            }`}
          >
            {/* Custom checkbox checked indicators */}
            <div className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 mt-0.5 ${
              isSelected 
                ? 'bg-indigo-500 border-indigo-400 text-white' 
                : 'border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5'
            }`}>
              {isSelected && <Check size={12} strokeWidth={3} />}
            </div>

            {/* Icon & Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`p-1 rounded bg-black/5 dark:bg-white/5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  <Icon size={16} />
                </span>
                <h4 className="font-heading text-sm font-bold text-gray-900 dark:text-white">{opt.title}</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-sans">{opt.description}</p>
            </div>
            
            {/* Small active badge in card corner */}
            {isSelected && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-bl-lg"></span>
            )}

          </motion.button>
        );
      })}
    </div>
  );
};
