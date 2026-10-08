import { useState } from 'react';
import { SectionLayout } from './SectionLayout';
import { contactInfo } from '../data/socials';

export function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.getElementById('contact-email');
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  return (
    <SectionLayout index="05" title="Contact" lede="Get in touch.">
      <div className="ruled-list">
        <div className="ruled-row">
          <span className="ruled-row__label">Email</span>
          <span className="ruled-row__value" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span id="contact-email" style={{ userSelect: 'all' }}>{contactInfo.email}</span>
            <button
              className="mono-label"
              onClick={copyEmail}
              style={{
                padding: '3px 10px',
                border: '1px solid var(--ink)',
                fontSize: 10,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
                background: copied ? 'var(--ink)' : 'transparent',
                color: copied ? 'var(--paper)' : 'var(--ink)',
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </span>
        </div>
        <div className="ruled-row">
          <span className="ruled-row__label">LinkedIn</span>
          <span className="ruled-row__value">
            <a href={contactInfo.linkedin.url} target="_blank" rel="noopener">
              {contactInfo.linkedin.label}
            </a>
          </span>
        </div>
        <div className="ruled-row">
          <span className="ruled-row__label">Location</span>
          <span className="ruled-row__value">{contactInfo.location}</span>
        </div>
      </div>
    </SectionLayout>
  );
}
