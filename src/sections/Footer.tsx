import React from 'react';
import { Logo } from '../components/Logo';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    product: [
      { name: 'Core Cleaner', href: '#features' },
      { name: 'Chart Builder', href: '#dashboard-preview' },
      { name: 'Predictive Pro', href: '#forecasting' },
      { name: 'Export Engine', href: '#features' },
    ],
    resources: [
      { name: 'CSV Formatting Guide', href: '#' },
      { name: 'Sales Seasonality Playbook', href: '#' },
      { name: 'Integrations SDK', href: '#' },
      { name: 'Developer API', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#hero' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Trust & Safety', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#faq' },
      { name: 'Status Dashboard', href: '#' },
      { name: 'Security Audits', href: '#' },
      { name: 'Contact Support', href: '#' },
    ]
  };

  return (
    <footer id="footer" className="relative bg-gray-50/50 dark:bg-gray-950/70 border-t border-black/5 dark:border-white/5 pt-16 pb-8 overflow-hidden transition-colors duration-300">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-brand-violet/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-black/5 dark:border-white/5">
          
          {/* Brand Column (takes 2 columns) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleScroll('#hero'); }}
              className="flex items-center gap-2 group w-max"
            >
              <Logo size={36} className="transform group-hover:scale-105 transition-transform duration-300" />
              <span className="font-heading font-bold text-lg tracking-tight bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-600 dark:from-white dark:via-indigo-200 dark:to-indigo-400 bg-clip-text text-transparent">
                InsightForge
              </span>
            </a>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm font-sans">
              Automated sales data intelligence. Transform messy spreadsheets and CSV logs into beautiful interactive graphs and future revenue predictions.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200" aria-label="GitHub">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {/* Column 1: Product */}
          <div className="text-left">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 font-sans">Product</h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-500 mb-3.5 leading-normal font-sans">
              Clean and clean transactions, customize charts, and deploy neural prediction models.
            </p>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        handleScroll(link.href);
                      }
                    }}
                    className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-sans"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="text-left">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 font-sans">Resources</h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-500 mb-3.5 leading-normal font-sans">
              Helpful documentation on formatting sales logs and building custom API keys.
            </p>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-sans">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="text-left">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 font-sans">Company</h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-500 mb-3.5 leading-normal font-sans">
              Learn about our vision, secure storage practices, audits, and remote positions.
            </p>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        handleScroll(link.href);
                      }
                    }}
                    className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-sans"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="text-left">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 font-sans">Support</h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-500 mb-3.5 leading-normal font-sans">
              Active status indicators, security compliance reports, and live ticket support.
            </p>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        handleScroll(link.href);
                      }
                    }}
                    className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-sans"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Metadata & Compliance */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-gray-500 font-sans">
          <div>
            &copy; {currentYear} InsightForge Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
