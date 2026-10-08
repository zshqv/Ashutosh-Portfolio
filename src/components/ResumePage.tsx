import { SectionLayout } from './SectionLayout';
import { resumeData } from '../data/experience';
import './ResumePage.css';

export function ResumePage() {
  return (
    <SectionLayout index="04" title="Resume" lede="View the full resume.">
      <div className="resume">
        {resumeData.cvLink && (
          <a href={resumeData.cvLink} target="_blank" rel="noopener" className="resume__cv-link mono-label">
            Download CV &darr;
          </a>
        )}
      </div>
    </SectionLayout>
  );
}
