import { SectionLayout } from './SectionLayout';
import './AboutPage.css';

export function AboutPage() {
  return (
    <SectionLayout
      index="03"
      title="About"
      lede="Behind the interface."
      loaderItems={[
        'Loading profile',
        'Loading background',
        'Loading interests',
      ]}
    >
      <div className="about-content">
        {/* PLACEHOLDER */}
        <p className="about-content__text">
          I work at the intersection of finance and technology, applying quantitative
          methods and machine learning to problems in valuation, risk, and market analysis.
          My aim is to make complex analysis accessible and actionable.
        </p>
        <p className="about-content__text">
          This portfolio is a record of selected projects and thinking. The interface
          draws inspiration from games I play — the visual language of NieR: Automata's
          menus, specifically — adapted for a professional context. The "Standard view"
          button in the top bar gives a conventional, single-page layout.
        </p>

        <div className="ruled-list" style={{ marginTop: 24 }}>
          <div className="ruled-row">
            <span className="ruled-row__label">Based in</span>
            {/* PLACEHOLDER */}
            <span className="ruled-row__value">India</span>
          </div>
          <div className="ruled-row">
            <span className="ruled-row__label">Focus</span>
            {/* PLACEHOLDER */}
            <span className="ruled-row__value">Finance, Applied AI</span>
          </div>
          <div className="ruled-row">
            <span className="ruled-row__label">Languages</span>
            {/* PLACEHOLDER */}
            <span className="ruled-row__value">English, Hindi</span>
          </div>
          <div className="ruled-row">
            <span className="ruled-row__label">Outside work</span>
            {/* PLACEHOLDER */}
            <span className="ruled-row__value">Gaming, reading, running</span>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
