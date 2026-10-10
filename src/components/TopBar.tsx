import { siteData } from '../data/site';
import { useClock } from '../hooks/useClock';
import { useApp } from '../contexts/AppContext';
import { ThemeToggle } from './ThemeToggle';

import './TopBar.css';

export function TopBar() {
  const time = useClock();
  const { soundOn, toggleSound } = useApp();

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <div className="top-bar__logo">{siteData.initials}</div>
        <span className="top-bar__title mono-label">
          {siteData.name} / Portfolio
        </span>
      </div>

      <div className="top-bar__center mono-label">
        Mumbai &middot; {time} IST
      </div>

      <div className="top-bar__right">
        <ThemeToggle />
        <button
          className="top-bar__btn mono-label"
          onClick={toggleSound}
          aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
        >
          Sound {soundOn ? 'on' : 'off'}
        </button>
      </div>
    </header>
  );
}
