export interface SocialLink {
  label: string;
  url: string;
}

export interface ContactInfo {
  email: string;
  linkedin: SocialLink;
  location: string;
}

// PLACEHOLDER
export const contactInfo: ContactInfo = {
  email: 'hello@example.com',
  linkedin: {
    label: 'linkedin.com/in/ashutosh-tripathi',
    url: 'https://linkedin.com/in/ashutosh-tripathi',
  },
  location: 'India',
};

// PLACEHOLDER
export const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/ashutosh-tripathi',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/ashutosh-tripathi',
  },
];
