export interface SkillGroup {
  title: string;
  items: string[];
}

// PLACEHOLDER
export const skillGroups: SkillGroup[] = [
  {
    title: 'Investment Banking & Advisory',
    items: [
      'DCF, comps, and precedent transaction analysis',
      'LBO and merger (accretion / dilution) modelling',
      'Three-statement financial modelling',
      'Pitch books and client-facing materials',
      'Due diligence and industry research',
      'Deal structuring and capital markets',
    ],
  },
  {
    title: 'Quantitative Finance & Risk',
    items: [
      'Portfolio optimisation (mean-variance, Black-Litterman)',
      'Value at Risk (VaR) and stress testing',
      'Factor models and alpha research',
      'Derivatives pricing and Greeks',
      'Credit risk modelling (PD, LGD, EAD)',
      'Time-series analysis and forecasting',
    ],
  },
  {
    title: 'Fintech & Applied AI',
    items: [
      'Python (pandas, NumPy, scikit-learn, PyTorch)',
      'NLP for financial text (earnings calls, filings)',
      'Claude / LLM API integration and prompt engineering',
      'Algorithmic trading and backtesting frameworks',
      'SQL and data pipeline design',
      'REST APIs and microservice architecture',
    ],
  },
  {
    title: 'Tools & Platforms',
    items: [
      'Microsoft Excel / Google Sheets (advanced)',
      'Bloomberg Terminal and FactSet',
      'Power BI and Tableau',
      'Git, GitHub, and CI/CD',
      'React, TypeScript, and Node.js',
      'LaTeX and technical writing',
    ],
  },
];
