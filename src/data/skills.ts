export interface SkillGroup {
  title: string;
  items: string[];
}

// PLACEHOLDER
export const skillGroups: SkillGroup[] = [
  {
    title: 'Valuation & Modelling',
    items: [
      'Discounted cash flow analysis',
      'Comparable company analysis',
      'Three-statement financial modelling',
      'Leveraged buyout modelling',
      'Scenario and sensitivity analysis',
    ],
  },
  {
    title: 'Markets & Risk',
    items: [
      'Equity research fundamentals',
      'Fixed income analysis',
      'Portfolio construction',
      'Value at Risk (VaR)',
      'Credit risk assessment',
    ],
  },
  {
    title: 'Data & Machine Learning',
    items: [
      'Python (pandas, NumPy, scikit-learn)',
      'SQL and relational databases',
      'Statistical analysis and hypothesis testing',
      'Natural language processing',
      'Data visualisation (matplotlib, Plotly)',
    ],
  },
  {
    title: 'Working Tools',
    items: [
      'Microsoft Excel (advanced)',
      'Bloomberg Terminal',
      'Power BI / Tableau',
      'Git and version control',
      'LaTeX for reports',
    ],
  },
];
