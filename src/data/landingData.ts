export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface StepItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  popular: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const featuresData: FeatureItem[] = [
  {
    id: "feat-csv-upload",
    title: "CSV Upload",
    description: "Instantly ingest your raw sales records with drag-and-drop support. Zero configuration or pre-formatting needed.",
    icon: "UploadCloud"
  },
  {
    id: "feat-data-cleaning",
    title: "Data Cleaning",
    description: "Automatic formatting, deduplication, and anomaly detection. We turn messy spreadsheets into structured analytics pipelines.",
    icon: "Sparkles"
  },
  {
    id: "feat-interactive-charts",
    title: "Interactive Charts",
    description: "Drill down into revenue logs with interactive graphs. Filter by product, category, region, and custom periods.",
    icon: "BarChart3"
  },
  {
    id: "feat-kpi-analytics",
    title: "KPI Analytics",
    description: "Track key metrics like Customer Lifetime Value (CLV), Customer Acquisition Cost (CAC), and Monthly Recurring Revenue (MRR).",
    icon: "Activity"
  },
  {
    id: "feat-sales-forecasting",
    title: "Sales Forecasting",
    description: "Unlock future-looking intelligence. View predicted revenue paths based on statistical regressions and deep-learning ML models.",
    icon: "TrendingUp"
  },
  {
    id: "feat-export-reports",
    title: "Export Reports",
    description: "Download beautiful presentation-ready PDF reports, slide decks, or fully-polished clean Excel worksheets with one click.",
    icon: "Download"
  }
];

export const statsData: StatItem[] = [
  {
    id: "stat-datasets",
    value: 10000,
    suffix: "+",
    label: "Datasets Processed"
  },
  {
    id: "stat-accuracy",
    value: 99.9,
    suffix: "%",
    label: "Accuracy Rate"
  },
  {
    id: "stat-insights",
    value: 500,
    suffix: "+",
    label: "AI Insights Generated"
  },
  {
    id: "stat-charts",
    value: 120,
    suffix: "+",
    label: "Charts Custom Created"
  }
];

export const stepsData: StepItem[] = [
  {
    id: "step-upload",
    number: "01",
    title: "Upload CSV",
    description: "Drop your standard sales spreadsheet into the loader. We support all major CRM, Stripe, Shopify, and manual exports."
  },
  {
    id: "step-clean",
    number: "02",
    title: "Clean Data",
    description: "Our processing layer scans rows, fixes format errors, eliminates duplicates, and structures columns automatically."
  },
  {
    id: "step-analyze",
    number: "03",
    title: "Analyze Performance",
    description: "Navigate high-impact interactive dashboards, review performance metrics, and pinpoint your highest-margin products."
  },
  {
    id: "step-predict",
    number: "04",
    title: "Predict Future Sales",
    description: "Activate AI forecasting to simulate next quarter's revenue trajectory, detect seasonality, and prepare inventory."
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Sarah Jenkins",
    role: "VP of Sales Operations",
    company: "ApexCommerce",
    quote: "InsightForge saved us countless hours of manual Excel cleaning. In less than two minutes, we had a board-ready deck showing exactly which products drove our Q1 growth.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    role: "Founder & CEO",
    company: "SaaSify Partners",
    quote: "The forecasting accuracy is uncanny. It successfully predicted our May slump and allowed us to adjust our marketing spend ahead of time, saving us thousands.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: "test-3",
    name: "Elena Rostova",
    role: "Head of Business Intelligence",
    company: "Globex Logistics",
    quote: "We integrated InsightForge's CSV data cleaner into our weekly workflow. The interactive dashboard allows our regional heads to drill down and export clean custom spreadsheets.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "price-starter",
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for solopreneurs and small store owners starting to make sense of their monthly sales CSV files.",
    features: [
      "Upload up to 3 CSVs per month",
      "Maximum 5,000 rows per file",
      "Standard data cleaning & formatting",
      "Access to basic KPI cards & charts",
      "Community support access"
    ],
    ctaText: "Get Started Free",
    popular: false
  },
  {
    id: "price-pro",
    name: "Pro",
    price: "$19",
    period: "month",
    description: "For scaling brands and growing sales teams who need deep trend analysis and forward-looking predictions.",
    features: [
      "Unlimited sales CSV uploads",
      "Support up to 100,000 rows per file",
      "Advanced data cleaning & error reports",
      "All interactive charts & regional metrics",
      "AI-powered 3-month sales forecasting",
      "Priority email & chat support"
    ],
    ctaText: "Start 14-Day Free Trial",
    popular: true
  },
  {
    id: "price-enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "tailored",
    description: "Designed for corporate BI divisions requiring custom models, high security, and massive datasets.",
    features: [
      "Unlimited file sizes & unlimited rows",
      "Dedicated custom AI forecasting models",
      "Real-time CRM & database integrations",
      "Custom brand PDF/Excel export reports",
      "99.9% uptime SLA & account manager",
      "SSO/SAML security compliance"
    ],
    ctaText: "Contact Sales",
    popular: false
  }
];

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "What format of sales CSV files does InsightForge support?",
    answer: "We support standard comma, semicolon, or tab-delimited text/CSV files exported from any major CRM (like HubSpot or Salesforce), e-commerce portal (like Shopify, Stripe, or WooCommerce), or hand-crafted Google Sheets and Excel documents. Our cleaner figures out headers, dates, currencies, and formats automatically."
  },
  {
    id: "faq-2",
    question: "Is my CSV sales data safe after uploading?",
    answer: "Absolutely. We treat security with the utmost seriousness. All uploads are encrypted in transit using SSL/TLS and at rest. If you choose standard cleaning, data is processed ephemeral in-memory and is never stored on persistent storage unless you create a permanent dashboard workspace account."
  },
  {
    id: "faq-3",
    question: "How accurate is the AI-driven sales forecasting engine?",
    answer: "Our predictive intelligence utilizes a hybrid model combining ARIMA, Prophet, and LSTM recurrent neural networks to capture seasonality and cyclical shifts. For businesses with at least 12 months of historical sales logs, we regularly achieve an historical accuracy rate exceeding 95%."
  },
  {
    id: "faq-4",
    question: "Can I customize the charts shown on the dashboard preview?",
    answer: "Yes! The dashboard is fully modular. You can rearrange tiles, choose chart visualizations (line, bar, pie, area, or scatter), toggle variables (gross vs net sales, order volume, region filters), and save your layout preferences to your profile."
  },
  {
    id: "faq-5",
    question: "Do I need a credit card to sign up for the Starter tier?",
    answer: "No, you do not. You can create a free account immediately with just an email address to process your first files and access basic dashboards. No credit card, commitment, or strings attached."
  },
  {
    id: "faq-6",
    question: "How do I export cleaned data or generated insights?",
    answer: "Inside the dashboard layout, each widget and analysis card contains an export menu. You can download raw cleaned CSV records, high-resolution SVG or PNG charts for slides, or compile a complete PDF summaries for executive briefings."
  }
];
