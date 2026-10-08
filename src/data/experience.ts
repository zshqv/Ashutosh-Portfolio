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

export const resumeData: ResumeData = {
  experience: [
    {
      title: 'Growth Associate',
      organisation: 'Stealth Startup, Mumbai',
      period: 'Apr 2026 – May 2026',
      description: 'Built outbound sales infrastructure in 48 hours; ran 70+ B2B cold calls daily; onboarded a new hire to full productivity within the same sprint.',
    },
    {
      title: 'Operations Intern',
      organisation: 'Stealth AI Startup, Mumbai',
      period: 'Sep 2025 – Apr 2026',
      description: 'Worked directly with the CEO on execution. Owned end-to-end product testing pre-launch and fed practical input into the tech team each build cycle.',
    },
    {
      title: 'Business Development Executive',
      organisation: 'Content Whale, Mumbai',
      period: 'Jun 2025 – Sep 2025',
      description: 'Beat monthly meeting targets by 34%. Managed full sales cycle from prospecting to closure with tailored client proposals.',
    },
  ],
  education: [
    {
      degree: 'B.Com, Accounting and Finance',
      institution: "St. Xavier's College, Mumbai",
      period: '2022 – 2025',
      details: '',
    },
  ],
  cvNote: 'Download the full resume below.',
  cvLink: '/resume/portfolio_resume.pdf',
};
