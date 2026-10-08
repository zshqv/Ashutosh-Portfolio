import { SectionLayout } from './SectionLayout';
import { socialLinks } from '../data/socials';

export function SocialsPage() {
  return (
    <SectionLayout index="06" title="Socials" lede="Elsewhere online.">
      <div className="ruled-list">
        {socialLinks.map((link) => (
          <div key={link.label} className="ruled-row" style={{ justifyContent: 'space-between' }}>
            <span className="ruled-row__value" style={{ fontWeight: 500 }}>{link.label}</span>
            <a
              href={link.url}
              target="_blank"
              rel="noopener"
              className="mono-label"
              style={{
                padding: '4px 12px',
                border: '1px solid var(--ink)',
                fontSize: 11,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'var(--ink)';
                (e.target as HTMLElement).style.color = 'var(--paper)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.color = 'var(--ink)';
              }}
            >
              Open &#8599;
            </a>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}
