export interface Project {
  name: string;
  description: string;
  area: string;
  tools: string;
  year: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
  projects: Project[];
}

// PLACEHOLDER
export const projectCategories: ProjectCategory[] = [
  {
    id: 'financial-models',
    label: 'Financial Models',
    projects: [
      {
        name: 'DCF & Three-Statement Model',
        description: 'End-to-end discounted cash flow model linked to income statement, balance sheet, and cash flow.',
        area: 'Valuation',
        tools: 'Excel, VBA',
        year: '2025',
      },
      {
        name: 'LBO Model — Mid-Cap Industrials',
        description: 'Leveraged buyout model with debt scheduling, IRR sensitivity tables, and multiple exit scenarios.',
        area: 'Private Equity',
        tools: 'Excel',
        year: '2025',
      },
      {
        name: 'Merger Model (Accretion / Dilution)',
        description: 'Combined entity model testing deal synergies, purchase price allocation, and EPS impact.',
        area: 'M&A',
        tools: 'Excel, VBA',
        year: '2024',
      },
    ],
  },
  {
    id: 'open-source',
    label: 'Open Source',
    projects: [
      {
        name: 'finkit',
        description: 'Python library for rapid financial statement analysis — ratio computation, peer comparison, and charting.',
        area: 'Tooling',
        tools: 'Python, pandas',
        year: '2025',
      },
      {
        name: 'marketsync',
        description: 'Lightweight data pipeline pulling live and historical market data into a local SQLite store.',
        area: 'Data Engineering',
        tools: 'Python, SQLite',
        year: '2024',
      },
    ],
  },
  {
    id: 'claude-skills',
    label: 'Claude Skills',
    projects: [
      {
        name: 'Equity Research Draft Generator',
        description: 'Claude skill that drafts structured equity research notes from raw financial data and earnings transcripts.',
        area: 'AI / Finance',
        tools: 'Claude API, TypeScript',
        year: '2026',
      },
      {
        name: 'Financial Document Parser',
        description: 'Skill extracting key metrics, risk factors, and guidance from 10-K and 10-Q filings.',
        area: 'AI / NLP',
        tools: 'Claude API, Python',
        year: '2026',
      },
    ],
  },
  {
    id: 'research-papers',
    label: 'Research Papers',
    projects: [
      {
        name: 'Sentiment-Driven Alpha in Indian Mid-Caps',
        description: 'Study testing whether NLP-derived sentiment scores from earnings calls predict abnormal returns.',
        area: 'Empirical Finance',
        tools: 'Python, statsmodels',
        year: '2025',
      },
      {
        name: 'Credit Spread Determinants — Emerging Markets',
        description: 'Panel regression analysing macro and firm-level drivers of corporate credit spreads in EM economies.',
        area: 'Fixed Income',
        tools: 'R, LaTeX',
        year: '2024',
      },
    ],
  },
  {
    id: 'quant-research',
    label: 'Quantitative Research',
    projects: [
      {
        name: 'Momentum Factor — NSE Universe',
        description: 'Backtested cross-sectional momentum strategy on NSE 500 with transaction cost and slippage modelling.',
        area: 'Quant Strategy',
        tools: 'Python, NumPy',
        year: '2025',
      },
      {
        name: 'Portfolio Risk Dashboard',
        description: 'Interactive dashboard computing VaR, Sharpe ratio, and drawdown analysis across asset classes.',
        area: 'Risk Analytics',
        tools: 'Python, Streamlit',
        year: '2024',
      },
      {
        name: 'Credit Default Classifier',
        description: 'Machine learning model predicting probability of default using financial ratios and macro indicators.',
        area: 'Credit Risk',
        tools: 'Python, scikit-learn',
        year: '2025',
      },
    ],
  },
];
