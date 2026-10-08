export interface SiteData {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  timezone: string;
  timezoneLabel: string;
  status: string;
  version: string;
  copyright: string;
  disclaimer: string;
}

export const siteData: SiteData = {
  name: 'Ashutosh Tripathi',
  initials: 'AT',
  // PLACEHOLDER
  role: 'Finance · Applied AI',
  // PLACEHOLDER
  tagline: 'Disciplined analysis, clearly communicated.',
  location: 'India',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST (UTC+05:30)',
  status: 'Available for conversations',
  version: '2026.10',
  copyright: '© 2026 Ashutosh Tripathi.',
  disclaimer: 'Views are my own and are not investment advice.',
};
