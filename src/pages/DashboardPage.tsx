import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  LogOut, 
  Download, 
  Search, 
  Database, 
  ArrowUpRight, 
  CheckCircle,
  FileSpreadsheet,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Server,
  LayoutDashboard
} from 'lucide-react';

import { Logo } from '../components/Logo';

interface DashboardPageProps {
  onLogout: () => void;
  currentUser?: { name: string; email: string } | null;
}

// Mock Transactions clean list
const mockTransactions = [
  { id: 'TX-10042', date: '2026-06-12', customer: 'Acme Corp', product: 'Forge Analytics (Pro)', status: 'Cleaned', amount: 1950.00 },
  { id: 'TX-10041', date: '2026-06-12', customer: 'Globex Logistics', product: 'CSV Optimizer', status: 'Cleaned', amount: 890.00 },
  { id: 'TX-10040', date: '2026-06-11', customer: 'Sarah Jenkins', product: 'Predictive Pro', status: 'Cleaned', amount: 1200.00 },
  { id: 'TX-10039', date: '2026-06-11', customer: 'ApexCommerce', product: 'Forge Analytics (Pro)', status: 'Cleaned', amount: 1950.00 },
  { id: 'TX-10038', date: '2026-06-10', customer: 'Marcus Vance', product: 'Report Automator', status: 'Cleaned', amount: 450.00 },
  { id: 'TX-10037', date: '2026-06-09', customer: 'Elena Rostova', product: 'CSV Optimizer', status: 'Cleaned', amount: 890.00 },
  { id: 'TX-10036', date: '2026-06-08', customer: 'SaaSify Partners', product: 'Predictive Pro', status: 'Cleaned', amount: 1200.00 },
];

// Revenue charts
const revenueChartData = [
  { day: 'Mon', revenue: 12000, forecast: 12000 },
  { day: 'Tue', revenue: 15000, forecast: 16000 },
  { day: 'Wed', revenue: 18000, forecast: 19000 },
  { day: 'Thu', revenue: 14000, forecast: 15500 },
  { day: 'Fri', revenue: 22000, forecast: 21000 },
  { day: 'Sat', revenue: 26000, forecast: 25000 },
  { day: 'Sun', revenue: 29000, forecast: 29500 },
];

const categoryChartData = [
  { name: 'Subscription', value: 65, color: '#6366f1' },
  { name: 'On-demand', value: 20, color: '#06b6d4' },
  { name: 'Services', value: 15, color: '#7c3aed' },
];

export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exporting, setExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'forecasting' | 'database'>('overview');
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const darkMode = true;

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateSqlScript = () => {
    const userName = currentUser?.name || 'Forge User';
    const userEmail = currentUser?.email || 'user@insightforge.com';
    const emailPrefix = userEmail.split('@')[0];
    
    const sqlInsertRows = mockTransactions.map((tx) => {
      // derive mapping types
      const category = tx.product.includes('Analytics') ? 'Software' : tx.product.includes('Optimizer') ? 'Software' : tx.product.includes('Predictive') ? 'Software' : 'Services';
      const region = tx.id.endsWith('2') ? 'Americas' : tx.id.endsWith('1') ? 'EMEA' : 'APAC';
      return `(1, '${tx.id}', '${tx.date}', '${tx.product}', '${category}', '${region}', ${tx.amount.toFixed(2)}, 1)`;
    }).join(',\n');

    return `-- =======================================================
-- InsightForge SQL Database Synchronization Script
-- Generated dynamically for ${userName} on ${new Date().toLocaleDateString()}
-- =======================================================

-- 1. Create table structure for User Accounts
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create table structure for processed Sales Data
CREATE TABLE IF NOT EXISTS sales_data (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    transaction_id VARCHAR(50) NOT NULL,
    sale_date DATE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    region VARCHAR(100),
    sales_amount DECIMAL(12, 2) NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert user record into local database
-- Note: Replace password_hash placeholder with a secure Argon2 or bcrypt hash.
INSERT INTO users (name, email, password_hash)
VALUES ('${userName}', '${userEmail}', '$2b$10$e9R12${emailPrefix.padEnd(20, 'x')}hash...')
ON CONFLICT (email) DO NOTHING;

-- 4. Ingest parsed and cleaned sales transactions (Linked to user ID: 1)
INSERT INTO sales_data (user_id, transaction_id, sale_date, product_name, category, region, sales_amount, quantity)
VALUES
${sqlInsertRows};

-- 5. Quick Verification Queries
-- Get total revenue by category for the user
SELECT category, SUM(sales_amount) as total_revenue, SUM(quantity) as total_units
FROM sales_data
WHERE user_id = 1
GROUP BY category
ORDER BY total_revenue DESC;
`;
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(generateSqlScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    const element = document.createElement("a");
    const file = new Blob([generateSqlScript()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "insightforge_sync.sql";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };



  const filteredTransactions = mockTransactions.filter(tx => 
    tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = (type: 'excel' | 'pdf') => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setShowExportModal(false);

      const headers = ['Transaction ID', 'Date', 'Customer', 'Product', 'Status', 'Amount'];
      const rows = filteredTransactions.map(tx => [
        tx.id,
        tx.date,
        tx.customer,
        tx.product,
        tx.status,
        `$${tx.amount.toFixed(2)}`
      ]);

      if (type === 'excel') {
        const excelContent = `
          <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
          <head>
            <meta charset="utf-8">
            <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sales Data</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            <style>
              th { background-color: #4f46e5; color: white; font-weight: bold; }
              td, th { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
            </style>
          </head>
          <body>
            <h2>InsightForge - Cleaned CSV Dataset Report</h2>
            <p>Exported on ${new Date().toLocaleDateString()}</p>
            <table>
              <thead>
                <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </body>
          </html>
        `;
        const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "sales_data_q2_clean.xls");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (type === 'pdf') {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>InsightForge Executive Report</title>
                <style>
                  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; background-color: #ffffff; }
                  h1 { font-size: 24px; color: #4f46e5; margin-bottom: 5px; }
                  p { font-size: 12px; color: #64748b; margin-top: 0; }
                  .kpis { display: flex; gap: 20px; margin: 30px 0; }
                  .kpi { border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; flex: 1; }
                  .kpi-title { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; }
                  .kpi-val { font-size: 20px; font-weight: bold; margin-top: 5px; }
                  table { width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 12px; }
                  th { background-color: #f1f5f9; text-align: left; padding: 10px; font-weight: bold; border-bottom: 2px solid #e2e8f0; }
                  td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
                  .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; background-color: #dcfce7; color: #15803d; }
                </style>
              </head>
              <body>
                <h1>InsightForge - Executive Sales Analysis</h1>
                <p>Generated on ${new Date().toLocaleDateString()} | Active Dataset: sales_data_q2.csv</p>
                
                <div class="kpis">
                  <div class="kpi">
                    <div class="kpi-title">Total Revenue</div>
                    <div class="kpi-val">$1,245,800</div>
                  </div>
                  <div class="kpi">
                    <div class="kpi-title">Total Orders</div>
                    <div class="kpi-val">8,420</div>
                  </div>
                  <div class="kpi">
                    <div class="kpi-title">Customers</div>
                    <div class="kpi-val">3,240</div>
                  </div>
                </div>

                <h2>Ingested Transaction Records</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rows.map(r => `
                      <tr>
                        <td><strong>${r[0]}</strong></td>
                        <td>${r[1]}</td>
                        <td>${r[2]}</td>
                        <td>${r[3]}</td>
                        <td><span class="badge">${r[4]}</span></td>
                        <td><strong>${r[5]}</strong></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
                <script>
                  window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 500);
                  };
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
        }
      }
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col font-sans select-none overflow-x-hidden transition-colors duration-300">
      
      {/* Grid background overlay */}
      <div className="grid-overlay"></div>

      {/* Header bar */}
      <header className="glass-nav sticky top-0 z-40 py-3 relative border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div className="text-left">
              <span className="font-heading font-bold text-lg text-gray-900 dark:text-white block leading-none">InsightForge</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-sans tracking-widest font-semibold uppercase">Workspace Enterprise</span>
            </div>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Clean Dataset Active
            </span>
            
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm flex items-center gap-2 border border-indigo-500/30 transition-all duration-200 cursor-pointer"
            >
              <Download size={14} />
              <span>Export Report</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-gray-500 dark:text-gray-400 border border-black/5 dark:border-white/5 transition-all duration-200 cursor-pointer"
              title="Log Out"
            >
              <LogOut size={18} />
            </button>
          </div>

        </div>
      </header>

      {/* Main dashboard body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Menu Column (3 columns on desktop) */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest font-sans px-3 block mb-3">
              Navigation
            </span>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'overview' 
                  ? 'bg-indigo-600/10 text-indigo-600 dark:text-white border-l-2 border-indigo-500' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <LayoutDashboard size={16} />
              Overview Dashboard
            </button>
            <button
              onClick={() => setActiveTab('forecasting')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'forecasting' 
                  ? 'bg-indigo-600/10 text-indigo-600 dark:text-white border-l-2 border-indigo-500' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <TrendingUp size={16} />
              AI Sales Forecasting
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'database' 
                  ? 'bg-indigo-600/10 text-indigo-600 dark:text-white border-l-2 border-indigo-500' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Database size={16} />
              Database SQL Sync
            </button>
          </div>

          {/* Quick dataset status card */}
          <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-5 text-left space-y-4">
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest font-sans block">
              File Metadata
            </span>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-1.5">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <FileSpreadsheet size={12} className="text-indigo-500 dark:text-indigo-400" /> Source File:
                </span>
                <span className="text-xs font-mono font-bold text-gray-900 dark:text-white truncate max-w-[120px]">sales_data_q2.csv</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-1.5">
                <span className="text-xs text-gray-500 dark:text-gray-400">Total Rows:</span>
                <span className="text-xs font-mono font-bold text-gray-900 dark:text-white">45,280</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-1.5">
                <span className="text-xs text-gray-500 dark:text-gray-400">Columns:</span>
                <span className="text-xs font-mono font-bold text-gray-900 dark:text-white">14 mapped</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Data integrity:</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-sans">99.9% Cleaned</span>
              </div>
            </div>

            <div className="p-3 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
              🛠️ <strong>Auto-cleaning actions:</strong> Filled 210 missing postal codes, parsed UTC dates, and merged 14 duplicate invoices.
            </div>
          </div>

        </div>

        {/* Content Column (9 columns on desktop) */}
        <div className="lg:col-span-9 space-y-8 flex flex-col">
          
          {/* Main overview display */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview-dashboard-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                
                {/* Metric indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* Card 1 */}
                  <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-5 text-left flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Monthly Recurring Revenue</span>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">$45,280</h3>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5 mt-1 font-sans">
                        <ArrowUpRight size={10} /> +12.4% vs last mo.
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      <Database size={20} />
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-5 text-left flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Gross Transactions</span>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,482</h3>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5 mt-1 font-sans">
                        <ArrowUpRight size={10} /> +6.8% volume
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      <FileSpreadsheet size={20} />
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-5 text-left flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Average Deal Margin</span>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">72.4%</h3>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-0.5 mt-1 font-sans">
                        <Sparkles size={10} /> AI Optimized
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                      <TrendingUp size={20} />
                    </div>
                  </div>

                </div>

                {/* Main analytical charts row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left big chart: Revenue Area (8 columns) */}
                  <div className="md:col-span-8 glass border border-black/10 dark:border-white/10 rounded-2xl p-5 flex flex-col h-[320px] text-left">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white font-sans">Revenue Trend & Projection</h4>
                        <p className="text-[10px] text-gray-500">Weekly sales summary compared with AI expectations</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-cyan-500/80"></span>
                      </div>
                    </div>
                    <div className="flex-1 min-h-0 w-full">
                      {mounted && (
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                          <AreaChart data={revenueChartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorFore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1f2937' : '#e2e8f0'} vertical={false} />
                            <XAxis dataKey="day" stroke={darkMode ? '#6b7280' : '#475569'} fontSize={10} tickLine={false} />
                            <YAxis stroke={darkMode ? '#6b7280' : '#475569'} fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0b0f19' : '#ffffff', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', color: darkMode ? '#ffffff' : '#0f172a' }} />
                            <Area name="Gross Revenue" type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                            <Area name="Predicted Revenue" type="monotone" dataKey="forecast" stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorFore)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>

                  {/* Right small chart: Categories Pie (4 columns) */}
                  <div className="md:col-span-4 glass border border-black/10 dark:border-white/10 rounded-2xl p-5 flex flex-col h-[320px] text-left">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white font-sans mb-3">Billing Shares</h4>
                    <div className="flex-1 flex items-center justify-center relative min-h-0">
                      {mounted && (
                        <ResponsiveContainer width="100%" height="80%" minWidth={0} minHeight={0}>
                          <PieChart>
                            <Pie
                              data={categoryChartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={65}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {categoryChartData.map((entry, index) => (
                                <Cell key={`cell-pie-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0b0f19' : '#ffffff', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', color: darkMode ? '#ffffff' : '#0f172a' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    {/* Legend */}
                    <div className="space-y-2 mt-2 pt-2 border-t border-black/5 dark:border-white/5">
                      {categoryChartData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span>{item.name}</span>
                          </div>
                          <span className="font-bold text-gray-900 dark:text-white">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Table Section: Clean CSV Transactions */}
                <div className="glass border border-black/10 dark:border-white/10 rounded-2xl p-5 text-left space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white font-sans">Ingested Sales Records</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Showing recent cleaned rows imported from CSV</p>
                    </div>

                    {/* Search / Filter Row */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-none">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Search records..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full sm:w-60 pl-9 pr-4 py-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-black/[0.04] dark:focus:bg-white/[0.04] transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actual clean table */}
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-xs sm:text-sm text-left text-gray-700 dark:text-gray-300">
                      <thead className="text-[10px] text-gray-500 uppercase bg-black/[0.01] dark:bg-white/[0.01] border-b border-black/5 dark:border-white/5">
                        <tr>
                          <th className="py-3 px-4">Transaction ID</th>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Product Mapped</th>
                          <th className="py-3 px-4">Import Status</th>
                          <th className="py-3 px-4 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 dark:divide-white/5 font-sans">
                        {filteredTransactions.length > 0 ? (
                          filteredTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors duration-150">
                              <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{tx.id}</td>
                              <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">{tx.customer}</td>
                              <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{tx.product}</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                                  <CheckCircle size={10} /> {tx.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right font-bold text-gray-900 dark:text-white">${tx.amount.toFixed(2)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-gray-500 font-sans">
                              <AlertCircle size={20} className="mx-auto mb-2 opacity-50" />
                              No records match your search criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>

              </motion.div>
            )}

            {activeTab === 'forecasting' && (
              // AI Forecasting Detailed Tab
              <motion.div
                key="forecasting-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-left space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-black/5 dark:border-white/5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-600 dark:text-violet-400 font-sans mb-2">
                      <Sparkles size={12} /> LSTM Neural Predictions
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-heading">AI Predictive Revenue Modeling</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-0.5">
                      Next-quarter revenue simulations compiled from 45,280 historical transaction timestamps.
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer">
                    <RefreshCw size={14} className="animate-pulse" />
                    <span>Re-run Prediction Model</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {/* Metric 1 */}
                  <div className="bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-xl p-4">
                    <span className="text-xs text-gray-500 font-sans">Forecast Horizon</span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white font-sans mt-1">90 Days (Q3)</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2 font-sans">Simulated up to Sep 30, 2026</p>
                  </div>
                  {/* Metric 2 */}
                  <div className="bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-xl p-4">
                    <span className="text-xs text-gray-500 font-sans">Expected Growth Velocity</span>
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-sans mt-1">+14.8%</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2 font-sans">Factoring summer peak seasonality</p>
                  </div>
                  {/* Metric 3 */}
                  <div className="bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-xl p-4">
                    <span className="text-xs text-gray-500 font-sans">Model Confidence Score</span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white font-sans mt-1">94.8% Accuracy</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2 font-sans">Mean absolute percentage error bounds</p>
                  </div>
                </div>

                <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/15 border border-indigo-100 dark:border-indigo-800/30 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-wider font-sans">Executive Summary</h4>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans font-light">
                    The forecasting engine has identified an upcoming <strong>18% seasonality spike</strong> starting early July, likely driven by subscription renewals identified in rows 2,400–4,890. We recommend maintaining current inventory allocations and preparing support capacity to align with the expected volume expansion.
                  </p>
                </div>

              </motion.div>
            )}

            {activeTab === 'database' && (
              // Database Sync Tab
              <motion.div
                key="database-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-left space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-black/5 dark:border-white/5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-600 dark:text-cyan-400 font-sans mb-2">
                      <Server size={12} /> Relational Schema Sync
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-heading">Database SQL Integration</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-0.5">
                      Schema structure and pre-populated SQL queries to store your account profile and processed sales transactions.
                    </p>
                  </div>
                  <button 
                    onClick={handleDownloadSql}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-650 hover:bg-indigo-500 rounded-xl transition-colors duration-200 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download .sql File</span>
                  </button>
                </div>

                {/* SQL Code Block */}
                <div className="space-y-3 relative">
                  <div className="flex justify-between items-center bg-black/5 dark:bg-white/5 rounded-t-xl px-4 py-2 border-b border-black/5 dark:border-white/5 text-[10px] text-gray-500 dark:text-gray-400 uppercase font-mono font-bold tracking-wider">
                    <span>PostgreSQL / MySQL Script</span>
                    <button
                      onClick={handleCopySql}
                      className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 font-sans font-bold"
                    >
                      {copied ? (
                        <>
                          <Check size={12} className="text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy SQL</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="overflow-x-auto w-full border border-black/10 dark:border-white/10 rounded-b-xl bg-slate-950 p-4 font-mono text-xs text-slate-350 leading-relaxed max-h-[380px] overflow-y-auto">
                    <pre className="text-left select-text whitespace-pre-wrap">{generateSqlScript()}</pre>
                  </div>
                </div>

                {/* Explanation Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white font-sans">1. User Account Mapping</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                      The <code>users</code> table stores registration credentials, including name and unique email. The password hashes must be secured using argon2id or bcrypt hashing functions in your backend before inserting.
                    </p>
                  </div>
                  <div className="bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white font-sans">2. Relational Integrity</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                      The <code>sales_data</code> table includes a <code>FOREIGN KEY</code> referencing <code>users(id)</code>. This ensures all transaction uploads are owned by a registered user.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      {/* Export modal popup wrapper */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass border border-black/10 dark:border-white/10 rounded-2xl p-6 max-w-sm w-full text-center space-y-6 relative"
            >
              <div className="space-y-2">
                <h4 className="text-base font-bold text-gray-900 dark:text-white font-heading">Export Dataset Analysis</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                  Choose a format to download the structured analytical summary of <strong>sales_data_q2.csv</strong>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleExport('excel')}
                  disabled={exporting}
                  className="py-3 px-4 rounded-xl border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 bg-black/[0.01] dark:bg-white/[0.01] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  <FileSpreadsheet size={24} className="text-cyan-600 dark:text-cyan-400" />
                  <span>Clean Excel</span>
                </button>
                
                <button
                  onClick={() => handleExport('pdf')}
                  disabled={exporting}
                  className="py-3 px-4 rounded-xl border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 bg-black/[0.01] dark:bg-white/[0.01] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  <Database size={24} className="text-indigo-600 dark:text-indigo-400" />
                  <span>Executive PDF</span>
                </button>
              </div>

              {exporting && (
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium font-sans animate-pulse">
                  Compiling report worksheets...
                </div>
              )}

              <button
                onClick={() => setShowExportModal(false)}
                disabled={exporting}
                className="w-full py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs text-gray-900 dark:text-white font-medium transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
