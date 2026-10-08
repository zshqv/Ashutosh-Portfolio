import { SectionLayout } from './SectionLayout';
import { skillGroups } from '../data/skills';
import './SkillsPage.css';

export function SkillsPage() {
  return (
    <SectionLayout
      index="02"
      title="Skills"
      lede="Analytical and technical capabilities."
      loaderItems={[
        'Loading IB & advisory',
        'Loading quant & risk',
        'Loading fintech & AI',
        'Loading tools & platforms',
      ]}
    >
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div key={group.title} className="skills-group">
            <h3 className="skills-group__title mono-label">{group.title}</h3>
            <ul className="skills-group__list">
              {group.items.map((item) => (
                <li key={item} className="skills-group__item">
                  <span className="skills-group__marker" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}
