import { SectionLayout } from './SectionLayout';
import './AboutPage.css';

export function AboutPage() {
  return (
    <SectionLayout index="03" title="About" lede="Behind the interface.">
      <div className="about-content">
        <p className="about-content__text">
          Graduated from St. Xavier's, Mumbai with no grand plan — drifted through
          college, worked three places, and realised I was meant for finance, not
          anything else. Non-tech background, self-taught in code and financial
          modelling — everything on this site I built or figured out myself.
          Currently hoping for a job in finance that I can commit to for the rest
          of my life.
        </p>
        <p className="about-content__text">
          I also enjoy publishing research papers — currently wrote 2 papers and
          in plan of publishing 1 more by the end of this year. Outside of work,
          I tryhard at games with no real-world outcome whatsoever, hit 1100 rating
          in chess after three months, and I'm currently learning to crochet and
          speak German. I also enjoy lifting heavy weights. I pick up hobbies in a
          very non-casual way and obsess over things that are completely insignificant.
        </p>

        <div className="ruled-list" style={{ marginTop: 24 }}>
          <div className="ruled-row">
            <span className="ruled-row__label">Based in</span>
            <span className="ruled-row__value">Mumbai, India</span>
          </div>
          <div className="ruled-row">
            <span className="ruled-row__label">Focus</span>
            <span className="ruled-row__value">Finance, Financial Modelling</span>
          </div>
          <div className="ruled-row">
            <span className="ruled-row__label">Languages</span>
            <span className="ruled-row__value">English, Hindi, German (learning)</span>
          </div>
          <div className="ruled-row">
            <span className="ruled-row__label">Outside work</span>
            <span className="ruled-row__value">Gaming, lifting, chess, crochet</span>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
