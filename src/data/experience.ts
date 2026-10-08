export interface ExperienceEntry {
  title: string;
  organisation: string;
  period: string;
  description: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface ResumeData {
  experience: ExperienceEntry[];
  education: EducationEntry[];
  cvNote: string;
  // PLACEHOLDER — set to a URL string when a PDF is available
  cvLink: string | null;
}

// PLACEHOLDER
export const resumeData: ResumeData = {
  experience: [
    {
      title: 'Financial Analyst',
      organisation: 'Placeholder Corp.',
      period: '2024 – Present',
      description: 'Equity research coverage and financial modelling for mid-cap industrials.',
    },
    {
      title: 'Research Intern',
      organisation: 'Placeholder Capital',
      period: '2023 – 2024',
      description: 'Supported senior analysts with industry research, data collection, and model updates.',
    },
  ],
  education: [
    {
      degree: 'B.Com (Hons) Finance',
      institution: 'Placeholder University',
      period: '2020 – 2023',
      details: 'Specialisation in corporate finance and financial markets.',
    },
  ],
  cvNote: 'A full CV is available on request.',
  cvLink: null,
};
