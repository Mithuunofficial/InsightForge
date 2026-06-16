import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Award
} from 'lucide-react';

import { Logo } from '../components/Logo';
import { UploadCard } from '../components/UploadCard';
import { ProgressStepper } from '../components/ProgressStepper';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { ForecastCard } from '../components/ForecastCard';
import { SummaryCard } from '../components/SummaryCard';
import { PreviewPanel } from '../components/PreviewPanel';

interface GetStartedPageProps {
  onComplete: () => void;
  onNavigateHome: () => void;
  currentUser?: { name: string; email: string } | null;
}

// First 10 rows mock csv preview
const mockRowsPreview = [
  { id: 1, date: '2026-06-01', product: 'Forge Analytics (Pro)', category: 'Software', region: 'Americas', sales: 1950.00, qty: 1 },
  { id: 2, date: '2026-06-01', product: 'CSV Optimizer', category: 'Software', region: 'EMEA', sales: 890.00, qty: 2 },
  { id: 3, date: '2026-06-02', product: 'Predictive Pro', category: 'Software', region: 'APAC', sales: 1200.00, qty: 1 },
  { id: 4, date: '2026-06-02', product: 'Forge Analytics (Pro)', category: 'Software', region: 'Americas', sales: 1950.00, qty: 1 },
  { id: 5, date: '2026-06-03', product: 'Report Automator', category: 'Support Services', region: 'EMEA', sales: 450.00, qty: 3 },
  { id: 6, date: '2026-06-04', product: 'CSV Optimizer', category: 'Software', region: 'EMEA', sales: 890.00, qty: 1 },
  { id: 7, date: '2026-06-05', product: 'Predictive Pro', category: 'Software', region: 'APAC', sales: 1200.00, qty: 1 },
  { id: 8, date: '2026-06-05', product: 'Add-ons Bundle', category: 'Add-ons', region: 'Americas', sales: 290.00, qty: 5 },
  { id: 9, date: '2026-06-06', product: 'Forge Analytics (Pro)', category: 'Software', region: 'Americas', sales: 1950.00, qty: 1 },
  { id: 10, date: '2026-06-07', product: 'Support Plan', category: 'Support Services', region: 'APAC', sales: 150.00, qty: 1 },
];

export const GetStartedPage: React.FC<GetStartedPageProps> = ({ onComplete, onNavigateHome, currentUser }) => {
  const getInitials = (name?: string) => {
    if (!name) return 'JD';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const [step, setStep] = useState(1);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [rowsCount, setRowsCount] = useState(0);
  const [colsCount, setColsCount] = useState(0);
  const [selectedAnalytics, setSelectedAnalytics] = useState<string[]>(['revenue-analysis', 'product-perf']);
  
  // Mappings state
  const [mappings, setMappings] = useState({
    date: 'date',
    product: 'product',
    category: 'category',
    region: 'region',
    sales: 'sales',
    quantity: 'qty'
  });

  // Forecasting settings
  const [forecastPeriod, setForecastPeriod] = useState('90 Days');
  const [forecastModel, setForecastModel] = useState('Prophet');



  // File Upload completed callback
  const handleUploadSuccess = (fileInfo: { name: string; size: string; rows: number; cols: number }) => {
    setFileName(fileInfo.name);
    setRowsCount(fileInfo.rows);
    setColsCount(fileInfo.cols);
    setFileUploaded(true);
    // Proceed to complete automatically after successful upload
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  const handleNext = () => {
    if (step === 1 && !fileUploaded) {
      alert('Please upload a sales CSV or Excel file to get started.');
      return;
    }
    if (step < 6) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const toggleAnalytics = (id: string) => {
    setSelectedAnalytics(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Sidebar link config
  const sidebarItems = [
    { num: 1, label: 'Upload Dataset' },
    { num: 2, label: 'Configuration' },
    { num: 3, label: 'Analytics Opts' },
    { num: 4, label: 'Forecasting' },
    { num: 5, label: 'Summary' },
    { num: 6, label: 'Complete' }
  ];

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col font-sans overflow-x-hidden selection:bg-indigo-600/30 selection:text-indigo-200 transition-colors duration-300">
      
      {/* Background vector overlays */}
      <div className="grid-overlay"></div>

      {/* Sticky Header Nav */}
      <nav className="glass-nav sticky top-0 z-40 py-3 relative border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo click returns home */}
          <button onClick={onNavigateHome} className="flex items-center gap-2 group cursor-pointer bg-transparent border-0 p-0">
            <Logo size={36} className="transform group-hover:scale-105 transition-transform" />
            <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">InsightForge</span>
          </button>
          
          {/* Mock navbar links */}
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <button onClick={onNavigateHome} className="hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 font-sans">Home</button>
            <span className="hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-sans">Features</span>
            <span className="hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-sans">Dashboard</span>
            <span className="hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer font-sans">About</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Profile avatar */}
            <div 
              title={currentUser?.name || 'User Profile'}
              className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-xs uppercase cursor-pointer"
            >
              {getInitials(currentUser?.name)}
            </div>
          </div>
        </div>
      </nav>

      {/* App Body wizard container layout */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Sidebar Menu (2 columns on desktop) */}
        <div className="hidden lg:col-span-2 lg:flex flex-col space-y-4 text-left">
          <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest font-sans px-2 block mb-3">
              Wizard Path
            </span>
            {sidebarItems.map((item) => {
              const isCurrent = step === item.num;
              const isDone = step > item.num;
              
              return (
                <button
                  key={item.num}
                  disabled={item.num > 1 && !fileUploaded}
                  onClick={() => setStep(item.num)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold font-sans transition-all duration-200 ${
                    isCurrent 
                      ? 'bg-indigo-600/10 text-indigo-600 dark:text-white border-l-2 border-indigo-500' 
                      : isDone 
                        ? 'text-emerald-600 dark:text-emerald-400 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer' 
                        : 'text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                    isCurrent ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' :
                    isDone ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'border-black/5 dark:border-white/5 text-gray-400 dark:text-gray-600'
                  }`}>
                    {isDone ? '✓' : item.num}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Security Message Widget */}
          <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-4 space-y-2 text-left">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              <ShieldCheck size={14} className="text-emerald-650 dark:text-emerald-400" />
              <span>Secure Ingest</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-normal font-sans">
              Dataset ingestion processes occur locally in-memory via TLS 1.3 encryption. Raw records are never permanently hosted or shared.
            </p>
          </div>
        </div>

        {/* Center Column: Form body (7 columns on desktop) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Stepper bar */}
          <div className="w-full">
            <ProgressStepper currentStep={step} />
          </div>

          {/* Active step form wrapper */}
          <div className="glass-card border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-between min-h-[440px] shadow-xl relative">
            <div className="absolute top-2 right-4 flex gap-1.5 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/20"></span>
            </div>

            {/* Steps Content Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Upload */}
                {step === 1 && (
                  <motion.div
                    key="step-upload-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-left space-y-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-sans">
                        Step 1 &bull; Ingestion
                      </span>
                      <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Upload Sales Dataset</h2>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        To construct analytics and forecast algorithms, please ingest a sales transaction file.
                      </p>
                    </div>
                    
                    <UploadCard onUploadSuccess={handleUploadSuccess} />
                  </motion.div>
                )}

                {/* Step 2: Configure */}
                {step === 2 && (
                  <motion.div
                    key="step-configure-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-sans">
                          Step 2 &bull; Column Mapping
                        </span>
                        {/* Dataset health index badge */}
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2 py-0.5 rounded-full">
                          <CheckCircle size={10} /> Health Score: Excellent
                        </span>
                      </div>
                      <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Configure Mapped Headers</h2>
                      <p className="text-xs text-gray-400 font-sans">
                        Confirm which spreadsheet columns contain target data. We have auto-detected coordinates based on column names.
                      </p>
                    </div>

                    {/* Mappings select grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Date */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-sans">Date Column</label>
                        <select 
                          value={mappings.date} 
                          onChange={(e) => setMappings({...mappings, date: e.target.value})}
                          className="w-full bg-white dark:bg-slate-950 border border-black/10 dark:border-white/5 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="date">date (UTC)</option>
                          <option value="id">transaction_id</option>
                        </select>
                      </div>
                      {/* Sales */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-sans">Sales revenue</label>
                        <select 
                          value={mappings.sales} 
                          onChange={(e) => setMappings({...mappings, sales: e.target.value})}
                          className="w-full bg-white dark:bg-slate-950 border border-black/10 dark:border-white/5 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="sales">gross_sales ($)</option>
                          <option value="qty">units_sold</option>
                        </select>
                      </div>
                    </div>

                    {/* First 10 rows CSV preview table */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block font-sans">First 10 Rows Data Preview</span>
                      <div className="overflow-x-auto w-full border border-black/5 dark:border-white/5 rounded-xl bg-black/[0.01] dark:bg-white/[0.01]">
                        <table className="w-full text-left text-[11px] text-gray-600 dark:text-gray-400">
                          <thead className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/5 dark:border-white/5 text-[9px] uppercase text-gray-550 dark:text-gray-500">
                            <tr>
                              <th className="py-2 px-3">Date</th>
                              <th className="py-2 px-3">Product Name</th>
                              <th className="py-2 px-3">Region</th>
                              <th className="py-2 px-3 text-right">Revenue</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-black/5 dark:divide-white/5 font-mono">
                            {mockRowsPreview.map((row) => (
                              <tr key={row.id}>
                                <td className="py-2 px-3">{row.date}</td>
                                <td className="py-2 px-3 text-gray-900 dark:text-white truncate max-w-[120px]">{row.product}</td>
                                <td className="py-2 px-3">{row.region}</td>
                                <td className="py-2 px-3 text-right font-bold text-indigo-650 dark:text-indigo-400">${row.sales.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Analytics */}
                {step === 3 && (
                  <motion.div
                    key="step-analytics-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-sans">
                        Step 3 &bull; Visual Preferences
                      </span>
                      <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Select Analytics Modules</h2>
                      <p className="text-xs text-gray-400 font-sans">
                        Toggle which diagnostic summary cards and visual tabs should render inside your enterprise dashboard.
                      </p>
                    </div>

                    <AnalyticsCard selectedIds={selectedAnalytics} onToggle={toggleAnalytics} />
                  </motion.div>
                )}

                {/* Step 4: Forecasting */}
                {step === 4 && (
                  <motion.div
                    key="step-forecasting-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-sans">
                        Step 4 &bull; Predictions
                      </span>
                      <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Enable AI Forecasting Settings</h2>
                      <p className="text-xs text-gray-400 font-sans">
                        Configure model time boundaries and regression algorithms to forecast revenue seasonality.
                      </p>
                    </div>

                    <ForecastCard 
                      period={forecastPeriod} 
                      model={forecastModel} 
                      onPeriodChange={setForecastPeriod} 
                      onModelChange={setForecastModel} 
                    />
                  </motion.div>
                )}

                {/* Step 5: Summary */}
                {step === 5 && (
                  <motion.div
                    key="step-summary-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 text-left"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-sans">
                        Step 5 &bull; Verification
                      </span>
                      <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Review Summary Parameters</h2>
                      <p className="text-xs text-gray-400 font-sans">
                        Confirm configuration choices. Click "Edit" if changes are needed.
                      </p>
                    </div>

                    <SummaryCard 
                      fileName={fileName}
                      rowsCount={rowsCount}
                      colsCount={colsCount}
                      forecastPeriod={forecastPeriod}
                      forecastModel={forecastModel}
                      selectedAnalytics={selectedAnalytics}
                      onEditStep={(s) => setStep(s)}
                    />
                  </motion.div>
                )}

                {/* Step 6: Complete / Launch */}
                {step === 6 && (
                  <motion.div
                    key="step-complete-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 text-center py-6 flex flex-col items-center justify-center"
                  >
                    {/* Simulated float confetti elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
                    </div>

                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/20 relative">
                      <Award size={36} />
                      <span className="absolute inset-[-4px] rounded-full border border-dashed border-indigo-500/30 animate-spin" style={{ animationDuration: '6s' }}></span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">Ready to Generate Insights</h2>
                      <p className="text-xs text-gray-400 font-sans max-w-sm mx-auto leading-relaxed">
                        Configuration files validated. Our ML pipeline is primed to format records and compile forecasts.
                      </p>
                    </div>

                    {/* Step checklist */}
                    <div className="glass-card border border-black/5 dark:border-white/5 rounded-xl p-4 text-xs font-sans text-left space-y-2.5 max-w-xs w-full mt-4">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle size={14} /> <span>Dataset Mapped</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle size={14} /> <span>Dashboard Layout Mapped</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle size={14} /> <span>AI Forecast Model Configured</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-black/5 dark:border-white/5 w-full flex flex-col items-center justify-center">
                      <button
                        type="button"
                        onClick={onComplete}
                        className="group relative inline-flex items-center justify-center py-3.5 px-10 rounded-full font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                      >
                        Generate Dashboard
                        <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom action controls */}
            {step < 6 && (
              <div className="flex justify-between items-center pt-6 border-t border-black/5 dark:border-white/5 mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex items-center gap-1 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${
                    step === 1 ? 'opacity-30 cursor-not-allowed text-gray-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <ArrowLeft size={14} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all duration-200 flex items-center gap-1 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: PreviewPanel (3 columns on desktop) */}
        <div className="lg:col-span-3 flex items-start justify-center">
          <PreviewPanel 
            hasFile={fileUploaded} 
            fileName={fileName}
            rowsCount={rowsCount}
            selectedColumns={mappings}
          />
        </div>

      </div>

      {/* Onboarding Footer */}
      <footer className="relative bg-gray-950/70 border-t border-white/5 py-8 mt-auto z-10 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">Documentation</span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">API</span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">Support</span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">Terms of Service</span>
          </div>
          <div className="flex gap-6">
            &copy; {new Date().getFullYear()} InsightForge. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};
