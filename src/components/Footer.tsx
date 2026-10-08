import { siteData } from '../data/site';
import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__left mono-label">
        <span className="site-footer__dot" />
        Sys. online
      </div>
      <div className="site-footer__right mono-label">
        {siteData.copyright} {siteData.disclaimer}
      </div>
    </footer>
  );
}
