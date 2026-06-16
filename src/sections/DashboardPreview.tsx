import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { BarChart3, TrendingUp, Compass, Activity, CheckCircle2 } from 'lucide-react';

// Tabs Data
type TabId = 'revenue' | 'products' | 'regions' | 'forecast';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const tabsConfig: TabConfig[] = [
  {
    id: 'revenue',
    label: 'Monthly Revenue',
    icon: Activity,
    title: 'Track Performance In Real-Time',
    description: 'Instantly visualize your gross sales volume, net profits, and average order values across seasonal cycles. Spot trends before they impact your cash flow.'
  },
  {
    id: 'products',
    label: 'Top Products',
    icon: BarChart3,
    title: 'Pinpoint Revenue Drivers',
    description: 'Drill down into product-level sales metrics to identify high-margin items, track inventory turnover, and see which category changes are fueling growth.'
  },
  {
    id: 'regions',
    label: 'Region Performance',
    icon: Compass,
    title: 'Understand Regional Saturation',
    description: 'Break down sales data by city, country, or custom shipping regions. Optimize distribution and marketing spend where conversion rates are highest.'
  },
  {
    id: 'forecast',
    label: 'Forecast Graph',
    icon: TrendingUp,
    title: 'Predict Next Quarter Revenue',
    description: 'Our proprietary machine learning models extend your historical sales logs to forecast future performance, factoring in seasonal peaks and market slowdowns.'
  }
];

// Mock Data specifically for this section
const monthlyRevenueData = [
  { name: 'Jul', revenue: 98000, profit: 54000 },
  { name: 'Aug', revenue: 104000, profit: 58000 },
  { name: 'Sep', revenue: 115000, profit: 64000 },
  { name: 'Oct', revenue: 110000, profit: 60000 },
  { name: 'Nov', revenue: 135000, profit: 79000 },
  { name: 'Dec', revenue: 175000, profit: 102000 },
];

const productData = [
  { category: 'Hardware', revenue: 78000, margin: 45 },
  { category: 'Software', revenue: 125000, margin: 85 },
  { category: 'Support Services', revenue: 42000, margin: 60 },
  { category: 'Add-ons', revenue: 29000, margin: 70 },
];

const regionDistribution = [
  { name: 'Americas', value: 48, color: '#3b82f6' },
  { name: 'EMEA', value: 32, color: '#06b6d4' },
  { name: 'APAC', value: 20, color: '#7c3aed' },
];

const forecastDoubleData = [
  { name: 'Jan', historical: 120000, forecast: null },
  { name: 'Feb', historical: 135000, forecast: null },
  { name: 'Mar', historical: 145000, forecast: 145000 },
  { name: 'Apr', historical: null, forecast: 162000 },
  { name: 'May', historical: null, forecast: 178000 },
  { name: 'Jun', historical: null, forecast: 195000 },
];

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('revenue');
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const renderChart = () => {
    if (!mounted) return null;

    switch (activeTab) {
      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="prevRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="prevProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="name" stroke={isDark ? '#6b7280' : '#475569'} fontSize={11} tickLine={false} />
              <YAxis stroke={isDark ? '#6b7280' : '#475569'} fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: isDark ? '#0b0f19' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }}
                labelStyle={{ color: isDark ? '#ffffff' : '#0f172a' }}
                itemStyle={{ fontSize: '12px', color: isDark ? '#e5e7eb' : '#374151' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area name="Gross Revenue" type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#prevRevenue)" />
              <Area name="Net Profit" type="monotone" dataKey="profit" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#prevProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'products':
        return (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <BarChart data={productData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="category" stroke={isDark ? '#6b7280' : '#475569'} fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke={isDark ? '#6b7280' : '#475569'} fontSize={11} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#7c3aed" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: isDark ? '#0b0f19' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }}
                labelStyle={{ color: isDark ? '#ffffff' : '#0f172a' }}
                itemStyle={{ fontSize: '12px', color: isDark ? '#e5e7eb' : '#374151' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar yAxisId="left" name="Sales Vol ($)" dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" name="Avg Margin (%)" dataKey="margin" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'regions':
        return (
          <div className="flex flex-col md:flex-row items-center justify-around h-full w-full">
            <div className="w-[180px] h-[180px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={regionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {regionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDark ? '#0b0f19' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }}
                    labelStyle={{ color: isDark ? '#ffffff' : '#0f172a' }}
                    itemStyle={{ fontSize: '12px', color: isDark ? '#e5e7eb' : '#374151' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-4 max-w-[200px] text-left">
              <span className="text-xs font-semibold text-gray-550 dark:text-gray-400 uppercase tracking-wider">Market Distribution</span>
              {regionDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-1">
                  <div className="flex items-center gap-2 text-sm text-gray-750 dark:text-gray-200">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'forecast':
        return (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={forecastDoubleData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1f2937' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="name" stroke={isDark ? '#6b7280' : '#475569'} fontSize={11} tickLine={false} />
              <YAxis stroke={isDark ? '#6b7280' : '#475569'} fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: isDark ? '#0b0f19' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }}
                labelStyle={{ color: isDark ? '#ffffff' : '#0f172a' }}
                itemStyle={{ fontSize: '12px', color: isDark ? '#e5e7eb' : '#374151' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line 
                name="Historical Revenue" 
                type="monotone" 
                dataKey="historical" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, stroke: '#3b82f6', fill: isDark ? '#030712' : '#ffffff' }} 
              />
              <Line 
                name="AI Revenue Forecast" 
                type="monotone" 
                dataKey="forecast" 
                stroke="#7c3aed" 
                strokeWidth={3} 
                strokeDasharray="5 5" 
                dot={{ r: 4, stroke: '#7c3aed', fill: isDark ? '#030712' : '#ffffff' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const currentTabInfo = tabsConfig.find(tab => tab.id === activeTab)!;

  return (
    <section id="dashboard-preview" className="py-24 relative overflow-hidden bg-black/[0.005] dark:bg-gray-950/45 border-t border-black/5 dark:border-white/5 transition-colors duration-300">
      {/* Glow effect */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-100 dark:border-cyan-800/30">
            Interactive Showcase
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            Dashboard Preview
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 font-sans"
          >
            Explore the responsive charting layer. Toggle through tabs to see how InsightForge breaks down raw CSV records.
          </motion.p>
        </div>

        {/* Dashboard Shell Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls - Left side (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-3">
              {tabsConfig.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left font-medium transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-600/10 border-indigo-500/40 text-indigo-600 dark:text-white shadow-lg shadow-indigo-950/20' 
                        : 'bg-black/[0.01] dark:bg-white/[0.01] border-black/5 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400'
                    }`}>
                      <TabIcon size={18} />
                    </div>
                    <span className="font-sans text-sm md:text-base">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation card of selected tab */}
            <div className="glass-card border border-black/5 dark:border-white/5 p-6 rounded-xl flex-1 lg:flex lg:flex-col lg:justify-center mt-6 lg:mt-0">
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1 mb-2">
                <CheckCircle2 size={12} /> Insight Layer
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <h4 className="text-base font-bold text-gray-900 dark:text-white font-heading">{currentTabInfo.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-sans">{currentTabInfo.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Chart Display Panel - Right side (8 columns) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="glass border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col flex-1 h-[400px] shadow-2xl relative">
              <div className="absolute top-2 right-4 flex gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-indigo-500/30"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-500/30"></span>
              </div>
              
              {/* Chart Frame */}
              <div className="flex-1 min-h-0 w-full pt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    {renderChart()}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
