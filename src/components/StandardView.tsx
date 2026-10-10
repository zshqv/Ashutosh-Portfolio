import { siteData } from '../data/site';
import { projectCategories } from '../data/projects';
import { skillGroups } from '../data/skills';
import { resumeData } from '../data/experience';
import { contactInfo, socialLinks } from '../data/socials';
import { useApp } from '../contexts/AppContext';
import { useState } from 'react';
import './StandardView.css';

export function StandardView() {
  const { theme, toggleTheme } = useApp();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback not needed in standard view */ }
  };

  return (
    <div className="standard">
      <header className="standard__header">
        <div className="standard__header-left">
          <div className="top-bar__logo">{siteData.initials}</div>
          <span className="mono-label">{siteData.name}</span>
        </div>
        <nav className="standard__nav">
          <a href="#projects" className="mono-label">Projects</a>
          <a href="#skills" className="mono-label">Skills</a>
          <a href="#about" className="mono-label">About</a>
          <a href="#resume" className="mono-label">Resume</a>
          <a href="#contact" className="mono-label">Contact</a>
          <a href="#socials" className="mono-label">Socials</a>
        </nav>
        <button className="top-bar__btn mono-label" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </header>

      <main className="standard__main">
        <section className="standard__hero">
          <h1 className="standard__name">{siteData.name}</h1>
          <p className="standard__role">{siteData.role}</p>
          <p className="standard__tagline">{siteData.tagline}</p>
        </section>

        <section id="projects" className="standard__section" aria-labelledby="std-projects">
          <h2 className="standard__section-title" id="std-projects">Projects</h2>
          {projectCategories.map((cat) => (
            <div key={cat.id} style={{ marginBottom: 20 }}>
              <h3 className="mono-label" style={{ marginBottom: 8 }}>{cat.label}</h3>
              {cat.projects.map((p) => (
                <div key={p.name} className="standard__project">
                  <strong>{p.name}</strong> &mdash; {p.description}
                  <span className="mono-label" style={{ marginLeft: 8 }}>{p.area} / {p.tools} / {p.year}</span>
                  {p.repoLink && (
                    <a href={p.repoLink} target="_blank" rel="noopener" className="mono-label" style={{ marginLeft: 8 }}>
                      GitHub &#8599;
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </section>

        <section id="skills" className="standard__section" aria-labelledby="std-skills">
          <h2 className="standard__section-title" id="std-skills">Skills</h2>
          <div className="standard__skills-grid">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <h3 className="mono-label" style={{ marginBottom: 8 }}>{g.title}</h3>
                <ul>{g.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="standard__section" aria-labelledby="std-about">
          <h2 className="standard__section-title" id="std-about">About</h2>
          <p>I work at the intersection of finance and technology, applying quantitative methods and machine learning to problems in valuation, risk, and market analysis.</p>
          <p style={{ marginTop: 12 }}>This portfolio draws visual inspiration from games I play.</p>
        </section>

        <section id="resume" className="standard__section" aria-labelledby="std-resume">
          <h2 className="standard__section-title" id="std-resume">Resume</h2>
          {resumeData.cvLink && (
            <a href={resumeData.cvLink} target="_blank" rel="noopener" className="mono-label" style={{ padding: '5px 14px', border: '1px solid var(--ink)', fontSize: 11 }}>
              Download CV &darr;
            </a>
          )}
        </section>

        <section id="contact" className="standard__section" aria-labelledby="std-contact">
          <h2 className="standard__section-title" id="std-contact">Contact</h2>
          <p>
            Email: <span style={{ userSelect: 'all' }}>{contactInfo.email}</span>
            <button className="mono-label" onClick={copyEmail} style={{ marginLeft: 8, padding: '2px 8px', border: '1px solid var(--ink)', cursor: 'pointer' }}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </p>
          <p>LinkedIn: <a href={contactInfo.linkedin.url} target="_blank" rel="noopener">{contactInfo.linkedin.label}</a></p>
          <p>Location: {contactInfo.location}</p>
        </section>

        <section id="socials" className="standard__section" aria-labelledby="std-socials">
          <h2 className="standard__section-title" id="std-socials">Socials</h2>
          {socialLinks.map((link) => (
            <p key={link.label}>
              <a href={link.url} target="_blank" rel="noopener">{link.label} &#8599;</a>
            </p>
          ))}
        </section>
      </main>

      <footer className="standard__footer">
        <span className="mono-label">{siteData.copyright} {siteData.disclaimer}</span>
      </footer>
    </div>
  );
}
