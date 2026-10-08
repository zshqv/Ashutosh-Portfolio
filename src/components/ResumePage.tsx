import { SectionLayout } from './SectionLayout';
import { resumeData } from '../data/experience';
import './ResumePage.css';

export function ResumePage() {
  return (
    <SectionLayout
      index="04"
      title="Resume"
      lede="Experience and education."
      loaderItems={[
        'Loading experience',
        'Loading education',
        'Syncing credentials',
      ]}
    >
      <div className="resume">
        <section aria-labelledby="resume-experience">
          <h3 className="mono-label resume__section-title" id="resume-experience">Experience</h3>
          <div className="resume__timeline">
            {resumeData.experience.map((e) => (
              <div key={e.title + e.period} className="resume__entry">
                <span className="resume__date mono-label">{e.period}</span>
                <div className="resume__detail">
                  <strong>{e.title}</strong>
                  <span className="resume__org">{e.organisation}</span>
                  <p className="resume__desc">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="resume-education" style={{ marginTop: 32 }}>
          <h3 className="mono-label resume__section-title" id="resume-education">Education</h3>
          <div className="resume__timeline">
            {resumeData.education.map((e) => (
              <div key={e.degree + e.period} className="resume__entry">
                <span className="resume__date mono-label">{e.period}</span>
                <div className="resume__detail">
                  <strong>{e.degree}</strong>
                  <span className="resume__org">{e.institution}</span>
                  <p className="resume__desc">{e.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="resume__cv-note">
          <p className="mono-label">{resumeData.cvNote}</p>
          {resumeData.cvLink && (
            <a href={resumeData.cvLink} target="_blank" rel="noopener" className="resume__cv-link mono-label">
              Download CV &darr;
            </a>
          )}
        </div>
      </div>
    </SectionLayout>
  );
}
