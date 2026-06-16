import React from 'react';
import CountUp from 'react-countup';
import type { LucideIcon } from 'lucide-react';


interface StatsCardProps {
  title: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
  iconColorClass?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  suffix = "",
  decimals = 0,
  icon: IconComponent,
  iconColorClass = "text-indigo-400"
}) => {
  // @ts-ignore
  const CountUpComponent = (CountUp.default || CountUp) as any;

  return (
    <div className="glass-card border border-black/5 dark:border-white/5 rounded-xl p-4 flex items-center justify-between text-left transition-all duration-300 hover:border-black/10 dark:hover:border-white/10 shadow-md">
      <div>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium font-sans uppercase tracking-wider">{title}</span>
        <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-sans mt-1">
          <CountUpComponent
            start={0}
            end={value}
            duration={4}
            separator=","
            decimals={decimals}
            suffix={suffix}
          />
        </h4>
      </div>
      <div className={`p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 ${iconColorClass}`}>
        <IconComponent size={20} />
      </div>
    </div>
  );
};
