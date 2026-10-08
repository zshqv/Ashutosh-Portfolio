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
  email: 'ashu10tripathi@gmail.com',
  linkedin: {
    label: 'linkedin.com/in/ashutoshtripathi10',
    url: 'https://www.linkedin.com/in/ashutoshtripathi10/',
  },
  location: 'India',
};

// PLACEHOLDER
export const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ashutoshtripathi10/',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/zshqv',
  },
];
