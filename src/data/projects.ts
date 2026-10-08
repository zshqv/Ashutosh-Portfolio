export interface Project {
  name: string;
  description: string;
  area: string;
  tools: string;
  year: string;
}

// PLACEHOLDER
export const projects: Project[] = [
  {
    name: 'DCF & Three-Statement Model',
    description: 'End-to-end discounted cash flow model linked to income statement, balance sheet, and cash flow.',
    area: 'Valuation',
    tools: 'Excel, VBA',
    year: '2025',
  },
  {
    name: 'Credit Default Classifier',
    description: 'Machine learning model predicting probability of default using financial ratios and macro indicators.',
    area: 'Credit Risk',
    tools: 'Python, scikit-learn',
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
    name: 'Earnings Call Text Analysis',
    description: 'NLP pipeline extracting sentiment and key topics from quarterly earnings call transcripts.',
    area: 'NLP / Finance',
    tools: 'Python, spaCy',
    year: '2024',
  },
];
