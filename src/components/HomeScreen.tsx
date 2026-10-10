import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteData } from '../data/site';
import { useKeyboard } from '../hooks/useKeyboard';
import { useApp } from '../contexts/AppContext';
import { ScrambleText } from './ScrambleText';
import { Reticle } from './Reticle';
import { ShutterTransition } from './ShutterTransition';
import { DottedGlobe } from './DottedGlobe';
import './HomeScreen.css';

const MENU_ITEMS = [
  { index: '01', label: 'Projects', desc: 'Selected work', path: '/projects' },
  { index: '02', label: 'Skills', desc: 'Analytical & technical', path: '/skills' },
  { index: '03', label: 'About', desc: 'Behind the interface', path: '/about' },
  { index: '04', label: 'Resume', desc: 'Experience & education', path: '/resume' },
  { index: '05', label: 'Contact', desc: 'Get in touch', path: '/contact' },
  { index: '06', label: 'Socials', desc: 'Elsewhere online', path: '/socials' },
];

interface HomeScreenProps {
  entered: boolean;
}

export function HomeScreen({ entered }: HomeScreenProps) {
  const [selected, setSelected] = useState(0);
  const [nudge, setNudge] = useState(-1);
  const navigate = useNavigate();
  const { playTick, playOpen, transitioning, setTransitioning } = useApp();
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pendingNav = useRef<string | null>(null);

  const goTo = useCallback(
    (path: string) => {
      if (transitioning) return;
      playOpen();
      pendingNav.current = path;
      setTransitioning(true);
    },
    [playOpen, transitioning, setTransitioning]
  );

  const handleMidpoint = useCallback(() => {
    if (pendingNav.current) {
      navigate(pendingNav.current);
      pendingNav.current = null;
    }
  }, [navigate]);

  const handleComplete = useCallback(() => {
    setTransitioning(false);
  }, [setTransitioning]);

  const triggerNudge = useCallback((i: number) => {
    setNudge(i);
    setTimeout(() => setNudge(-1), 200);
  }, []);

  useKeyboard({
    onUp: () => {
      setSelected((s) => {
        const next = s > 0 ? s - 1 : MENU_ITEMS.length - 1;
        playTick();
        triggerNudge(next);
        return next;
      });
    },
    onDown: () => {
      setSelected((s) => {
        const next = s < MENU_ITEMS.length - 1 ? s + 1 : 0;
        playTick();
        triggerNudge(next);
        return next;
      });
    },
    onEnter: () => goTo(MENU_ITEMS[selected].path),
    onBack: () => {},
    onNumber: (n) => {
      const idx = n - 1;
      if (idx >= 0 && idx < MENU_ITEMS.length) {
        setSelected(idx);
        playTick();
        goTo(MENU_ITEMS[idx].path);
      }
    },
    enabled: !transitioning,
  });

  useEffect(() => {
    menuRefs.current[selected]?.focus({ preventScroll: true });
  }, [selected]);

  const [winWidth, setWinWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const globeSize = useMemo(() => winWidth <= 480 ? 160 : winWidth <= 820 ? 200 : 240, [winWidth]);
  const isMobile = winWidth <= 820;

  return (
    <>
      <main className="home">
        <div className="home__left">
          <div className="mono-label home__eyebrow">Portfolio &middot; 2026</div>
          <div className="home__status mono-label">
            <span className="home__status-dot" />
            {siteData.status}
          </div>
          <h1 className="home__name" aria-label={siteData.name}>
            <span className="home__name-line" aria-hidden="true">
              {entered ? (
                <ScrambleText text="ASHUTOSH" delay={100} />
              ) : (
                'ASHUTOSH'
              )}
            </span>
            <span className="home__name-sep" aria-hidden="true"> / </span>
            <span className="home__name-line" aria-hidden="true">
              {entered ? (
                <ScrambleText text="TRIPATHI" delay={300} />
              ) : (
                'TRIPATHI'
              )}
            </span>
          </h1>
          <DottedGlobe size={globeSize} />
        </div>

        <nav className="home__right" aria-label="Main navigation">
          <div className="home__menu-header">
            <span className="home__menu-header-label">Select destination</span>
          </div>
          <div className="home__menu" role="list">
            {MENU_ITEMS.map((item, i) => (
              <a
                key={item.path}
                ref={(el) => { menuRefs.current[i] = el; }}
                href={item.path}
                role="listitem"
                className={`home__menu-row ${selected === i ? 'home__menu-row--selected' : ''} ${nudge === i ? 'home__menu-row--nudge' : ''} ${entered ? 'home__menu-row--entered' : ''}`}
                style={entered ? { animationDelay: `${i * 62}ms` } as React.CSSProperties : undefined}
                aria-current={selected === i ? 'true' : undefined}
                onMouseEnter={() => {
                  if (selected !== i) {
                    setSelected(i);
                    playTick();
                    triggerNudge(i);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(item.path);
                }}
                tabIndex={selected === i ? 0 : -1}
              >
                <span className="home__menu-index mono-label">{item.index}</span>
                <span className="home__menu-label">{item.label}</span>
                <span className="home__menu-desc mono-label">{item.desc}</span>
                <div className="home__menu-bar" />
              </a>
            ))}
            <div
              className="home__menu-marker"
              style={{ transform: `translateY(${selected * (isMobile ? 44 : 52)}px)` }}
              aria-hidden="true"
            />
          </div>
          {!isMobile && (
            <div className="home__hint mono-label">
              Arrow keys navigate &middot; Enter selects &middot; Esc returns
            </div>
          )}
        </nav>
      </main>

      <Reticle menuIndex={selected} />

      {transitioning && (
        <ShutterTransition active={true} onMidpoint={handleMidpoint} onComplete={handleComplete} />
      )}
    </>
  );
}
