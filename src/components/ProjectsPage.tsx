import { SectionLayout } from './SectionLayout';
import { projects } from '../data/projects';
import './ProjectsPage.css';

export function ProjectsPage() {
  return (
    <SectionLayout index="01" title="Projects" lede="Selected work across valuation, risk, and applied AI.">
      <div className="projects-table">
        <div className="projects-table__header">
          <span className="mono-label">Project</span>
          <span className="mono-label">Area</span>
          <span className="mono-label">Tools</span>
          <span className="mono-label">Year</span>
        </div>
        {projects.map((p) => (
          <div key={p.name} className="projects-table__row">
            <div className="projects-table__name">
              <strong>{p.name}</strong>
              <span className="projects-table__desc">{p.description}</span>
            </div>
            <span className="projects-table__cell">{p.area}</span>
            <span className="projects-table__cell">{p.tools}</span>
            <span className="projects-table__cell mono-label">{p.year}</span>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}
