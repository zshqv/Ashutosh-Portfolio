export interface Project {
  name: string;
  description: string;
  area: string;
  tools: string;
  year: string;
  fileLink?: string;
  repoLink?: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
  projects: Project[];
}

export const projectCategories: ProjectCategory[] = [
  {
    id: 'financial-models',
    label: 'Financial Models',
    projects: [
      {
        name: 'Spotify LBO Model',
        description: 'Full take-private LBO model for Spotify with integrated financial statements, 7-year debt schedule, returns sensitivities, and IC analysis. Includes scenario toggles (base/upside/downside), operating build by segment, and an interview brief sheet.',
        area: 'Private Equity',
        tools: 'Excel',
        year: '2026',
        fileLink: '/models/Spotify_LBO_Model.xlsx',
      },
      {
        name: 'Vodafone Restructuring Model',
        description: 'Distressed restructuring model featuring a 13-week cash flow liquidity test, capital structure waterfall, restructuring projections, and a liquidation waterfall analysis with full reconciliation and logic mapping.',
        area: 'Restructuring',
        tools: 'Excel',
        year: '2026',
        fileLink: '/models/Vodaphone Restructuring model.xlsx',
      },
    ],
  },
  {
    id: 'open-source',
    label: 'Open Source',
    projects: [
      {
        name: 'Trikosh',
        description: 'Financial research platform for students and aspiring analysts. Organises five years of statements, pre-computed ratios, and peer comparisons for 200 companies across six sectors. Live at trikosh.xyz.',
        area: 'Platform',
        tools: 'Next.js, FastAPI, PostgreSQL',
        year: '2026',
        repoLink: 'https://github.com/zshqv/Trikosh',
      },
      {
        name: 'BriefOS',
        description: 'One-click company research brief generator. Takes a stock ticker and produces a structured PDF with valuation, profitability, financial statements, and auto-detected flags like elevated P/E or strong ROE.',
        area: 'Analyst Tooling',
        tools: 'Python, yfinance, fpdf2',
        year: '2026',
        repoLink: 'https://github.com/zshqv/BriefOS',
      },
      {
        name: 'PitchOS',
        description: 'Automated M&A rationale generator. Takes two tickers (acquirer and target) and outputs a one-page PDF deal brief with EV/EBITDA valuation, a five-year DCF, deal rationale, and automated risk flags.',
        area: 'Analyst Tooling',
        tools: 'Python, yfinance',
        year: '2026',
        repoLink: 'https://github.com/zshqv/PitchOS',
      },
      {
        name: 'RedFlag',
        description: 'Flags risk anomalies in SEC filings that the human eye misses. Pulls 10-K reports from EDGAR, scans for risk language across legal, financial, operational, and regulatory categories, and compares year-over-year trends.',
        area: 'Risk Analytics',
        tools: 'Python, BeautifulSoup, TextBlob',
        year: '2026',
        repoLink: 'https://github.com/zshqv/RedFlag',
      },
      {
        name: 'Insider',
        description: 'Inbound career intelligence engine and pipeline CRM. Aggregates career opportunities and manages them through a structured pipeline.',
        area: 'Career Tools',
        tools: 'Python',
        year: '2026',
        repoLink: 'https://github.com/zshqv/Insider',
      },
    ],
  },
  {
    id: 'claude-skills',
    label: 'Claude Skills',
    projects: [
      {
        name: 'Socrates',
        description: 'A diagnostic-first adaptive learning skill for Claude. It assesses what you already know through a short diagnostic conversation, then builds a tailored curriculum with constrained case studies and self-reflective feedback loops.',
        area: 'AI / Education',
        tools: 'Claude Code Skills',
        year: '2026',
        repoLink: 'https://github.com/zshqv/socrates',
      },
      {
        name: 'Practitioner Finance Skills',
        description: 'Pulls Claude out of the classroom and into the deal room. Includes deal-read for assessing entry price, capital structure stress, and red flags, and three-statement-intuition for teaching the logic behind financial statements before the mechanics.',
        area: 'AI / Finance',
        tools: 'Claude Code Skills',
        year: '2026',
        repoLink: 'https://github.com/zshqv/practitioner-finance-skills',
      },
      {
        name: 'Wall Street Format',
        description: 'Applies investment banking and private equity formatting conventions to Excel models and PowerPoint pitchbooks. Handles standard color coding for inputs, formulas, and links, banking-style number formats, and action-titled slide structures.',
        area: 'AI / Finance',
        tools: 'Claude Code Skills, Python',
        year: '2026',
        repoLink: 'https://github.com/zshqv/wall-street-format',
      },
    ],
  },
  {
    id: 'research-papers',
    label: 'Research Papers',
    projects: [
      {
        name: 'Zombie Banks and Japan’s Lost Decade',
        description: 'Argues that Japan’s decade-long stagnation was driven not by the bubble collapse itself, but by banks hiding bad debt and regulators tolerating zombie lending—delaying loss recognition that misdirected capital economy-wide. A comparative analysis with the 2008 GFC shows faster disclosure and recapitalisation produced far shorter crises.',
        area: 'Banking & Macro',
        tools: 'Qualitative case study',
        year: '2025',
        fileLink: '/papers/Zombie_Banks_and_Japans_Lost_Decade.pdf',
      },
      {
        name: 'When the Licence Becomes the Liability: IP Inversion in Licensing',
        description: 'Proposes the “inversion thesis” — licensing relationships structurally flip when a licensee’s operational investment creates ecosystem value exceeding the licensor’s brand. Examines EA/FIFA, Disney/Netflix, and Sony’s first-party model, then offers a four-part M&A due diligence framework for licence-dependent assets.',
        area: 'IP & M&A Strategy',
        tools: 'Qualitative case study',
        year: '2026',
        fileLink: '/papers/Tripathi_IP_Inversion_Paper_Final.pdf',
      },
    ],
  },
  {
    id: 'quant-research',
    label: 'Quantitative Research',
    projects: [
      {
        name: 'Retirement Monte Carlo Simulator',
        description: 'Tests whether the 4% retirement rule holds for a $1M all-stock portfolio over 30 years. Compares historical 30-year windows from Shiller\'s 1871–2012 real return data against multiple simulation methods to show that return clustering materially affects survival rates.',
        area: 'Simulation & Risk',
        tools: 'Python, NumPy, Matplotlib',
        year: '2026',
        repoLink: 'https://github.com/zshqv/Retirement-Monte-Carlo-Simulator',
      },
    ],
  },
];
