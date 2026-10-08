import { useState } from 'react';
import { SectionLayout } from './SectionLayout';
import { projectCategories } from '../data/projects';
import './ProjectsPage.css';

export function ProjectsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const active = projectCategories[activeTab];

  return (
    <SectionLayout index="01" title="Projects" lede="Selected work across valuation, risk, and applied AI.">
      <div className="projects">
        <nav className="projects-tabs" role="tablist" aria-label="Project categories">
          {projectCategories.map((cat, i) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`panel-${cat.id}`}
              className={`projects-tabs__tab mono-label ${activeTab === i ? 'projects-tabs__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-label={active.label}
          className="projects-table"
        >
          <div className="projects-table__header">
            <span className="mono-label">Project</span>
            <span className="mono-label">Area</span>
            <span className="mono-label">Tools</span>
            <span className="mono-label">Year</span>
          </div>
          {active.projects.map((p) => (
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
      </div>
    </SectionLayout>
  );
}
