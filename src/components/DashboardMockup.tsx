import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { TrendingUp, Users, ShoppingBag, ArrowUpRight } from 'lucide-react';

// Mock Data for charts
const salesTrendData = [
  { month: 'Jan', revenue: 65000, orders: 480 },
  { month: 'Feb', revenue: 78000, orders: 590 },
  { month: 'Mar', revenue: 72000, orders: 550 },
  { month: 'Apr', revenue: 95000, orders: 710 },
  { month: 'May', revenue: 110000, orders: 830 },
  { month: 'Jun', revenue: 125000, orders: 940 },
  { month: 'Jul', revenue: 140000, orders: 1050 },
];

const productPerformanceData = [
  { name: 'Forge Analytics', sales: 42000 },
  { name: 'CSV Optimizer', sales: 31000 },
  { name: 'Predictive Pro', sales: 27000 },
  { name: 'Report Automator', sales: 18000 },
];

const regionData = [
  { name: 'North America', value: 55, color: '#6366f1' }, // Indigo
  { name: 'Europe', value: 25, color: '#06b6d4' },        // Cyan
  { name: 'Asia Pacific', value: 15, color: '#a855f7' },   // Purple
  { name: 'Other', value: 5, color: '#3b82f6' },          // Blue
];

export const DashboardMockup: React.FC = () => {
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

  return (
    <div className="glass border border-black/10 dark:border-white/10 rounded-2xl p-5 md:p-6 w-full shadow-2xl shadow-indigo-950/5 dark:shadow-indigo-950/20 text-left">
      
      {/* Top Bar / Header of Mockup */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-6 border-b border-black/5 dark:border-white/5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-100 dark:border-cyan-800/30">
            Live Demo Workspace
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 font-sans">Enterprise Overview</h3>
        </div>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        
        {/* KPI 1 */}
        <div className="bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Revenue</span>
            <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-1">$1,245,800</h4>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
              <ArrowUpRight size={12} /> +14.2%
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <TrendingUp size={18} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Orders</span>
            <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-1">8,420</h4>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
              <ArrowUpRight size={12} /> +8.7%
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <ShoppingBag size={18} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Customers</span>
            <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-1">3,240</h4>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
              <ArrowUpRight size={12} /> +11.5%
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Users size={18} />
          </div>
        </div>

      </div>

      {/* Charts Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Trend Chart (2 columns width on desktop) */}
        <div className="lg:col-span-2 bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-4 flex flex-col h-[260px]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Revenue & Orders Trend</span>
            <span className="text-[10px] text-gray-500">Jan - Jul (Monthly)</span>
          </div>
          <div className="flex-1 min-h-0 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={salesTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke={isDark ? '#4b5563' : '#64748b'} fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke={isDark ? '#4b5563' : '#64748b'} fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDark ? '#0b0f19' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }}
                    labelStyle={{ color: isDark ? '#fff' : '#0f172a', fontSize: '11px', fontWeight: 'bold' }}
                    itemStyle={{ color: isDark ? '#a5b4fc' : '#4f46e5', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Regional Distribution Pie Chart */}
        <div className="bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-4 flex flex-col h-[260px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Region Performance</span>
            <span className="text-[10px] text-gray-550">Sales %</span>
          </div>
          <div className="flex-1 flex items-center justify-center relative min-h-0">
            {mounted && (
              <ResponsiveContainer width="100%" height="80%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={58}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDark ? '#0b0f19' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px', color: isDark ? '#e5e7eb' : '#374151' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-5px]">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Growth</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">+24%</span>
            </div>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-black/5 dark:border-white/5">
            {regionData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Row - Product Performance Bar Chart */}
      <div className="bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl p-4 mt-6 flex flex-col h-[200px]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Top Performing Products</span>
          <span className="text-[10px] text-gray-550">Revenue (USD)</span>
        </div>
        <div className="flex-1 min-h-0 w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={productPerformanceData} layout="vertical" margin={{ top: 0, right: 5, left: 20, bottom: 0 }}>
                <XAxis type="number" stroke={isDark ? '#4b5563' : '#64748b'} fontSize={9} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke={isDark ? '#4b5563' : '#64748b'} fontSize={9} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDark ? '#0b0f19' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }}
                  itemStyle={{ color: isDark ? '#3b82f6' : '#1d4ed8', fontSize: '11px' }}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={10}>
                  {productPerformanceData.map((_, index) => {
                    const colors = ['#4f46e5', '#06b6d4', '#7c3aed', '#3b82f6'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

    </div>
  );
};
