import React from 'react';
import { Edit2, FileSpreadsheet, BarChart3, TrendingUp, Clock } from 'lucide-react';
import { analyticsOptions } from './AnalyticsCard';

interface SummaryCardProps {
  fileName: string;
  rowsCount: number;
  colsCount: number;
  forecastPeriod: string;
  forecastModel: string;
  selectedAnalytics: string[];
  onEditStep: (step: number) => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  fileName,
  rowsCount,
  colsCount,
  forecastPeriod,
  forecastModel,
  selectedAnalytics,
  onEditStep
}) => {
  // Map selected IDs to titles
  const selectedTitles = selectedAnalytics.map(
    id => analyticsOptions.find(opt => opt.id === id)?.title || id
  );

  return (
    <div className="space-y-6 text-left">
      
      {/* Segment 1: Dataset details */}
      <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <FileSpreadsheet size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white font-heading">Dataset Metadata</h4>
            <p className="text-xs text-gray-650 dark:text-gray-400 mt-1 font-sans">
              <strong>{fileName}</strong> &bull; {rowsCount.toLocaleString()} rows &bull; {colsCount} columns
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onEditStep(1)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer bg-transparent border-0"
        >
          <Edit2 size={12} />
          <span>Edit File</span>
        </button>
      </div>

      {/* Segment 2: Analytics preferences */}
      <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <BarChart3 size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white font-heading">Analytics Dashboards</h4>
            <p className="text-xs text-gray-650 dark:text-gray-400 mt-1 font-sans leading-relaxed max-w-md">
              {selectedTitles.length > 0 ? selectedTitles.join(', ') : 'None selected'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onEditStep(3)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer bg-transparent border-0"
        >
          <Edit2 size={12} />
          <span>Edit Preferences</span>
        </button>
      </div>

      {/* Segment 3: Forecasting settings */}
      <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
            <TrendingUp size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white font-heading">AI Forecasting parameters</h4>
            <p className="text-xs text-gray-650 dark:text-gray-400 mt-1 font-sans">
              <strong>{forecastModel}</strong> model &bull; <strong>{forecastPeriod}</strong> horizon window
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onEditStep(4)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer bg-transparent border-0"
        >
          <Edit2 size={12} />
          <span>Edit Forecasting</span>
        </button>
      </div>

      {/* Segment 4: Est time summary card */}
      <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-5 flex items-center gap-3 bg-black/[0.005] dark:bg-white/[0.01]">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <Clock size={18} />
        </div>
        <div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">Estimated Compile Time</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 block font-sans">
            5–10 seconds
          </span>
        </div>
      </div>

    </div>
  );
};
