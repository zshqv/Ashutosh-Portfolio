import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectCategories } from '../data/projects';
import { useKeyboard } from '../hooks/useKeyboard';
import { useApp } from '../contexts/AppContext';
import { ShutterTransition } from './ShutterTransition';
import './ProjectsPage.css';

const CATEGORY_INDICES = ['01', '02', '03', '04', '05'];

export function ProjectsPage() {
  const [selected, setSelected] = useState(0);
  const [nudge, setNudge] = useState(-1);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [transitioning, setLocalTransitioning] = useState(false);
  const navigate = useNavigate();
  const { playTick, playOpen, playBack, transitioning: globalTransitioning, setTransitioning } = useApp();
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pendingAction = useRef<'open' | 'back' | null>(null);
  const backRef = useRef<HTMLButtonElement>(null);

  const triggerNudge = useCallback((i: number) => {
    setNudge(i);
    setTimeout(() => setNudge(-1), 200);
  }, []);

  const openCat = useCallback((idx: number) => {
    if (transitioning) return;
    playOpen();
    pendingAction.current = 'open';
    setSelected(idx);
    setLocalTransitioning(true);
  }, [playOpen, transitioning]);

  const goBack = useCallback(() => {
    if (transitioning || globalTransitioning) return;
    if (openCategory !== null) {
      playBack();
      pendingAction.current = 'back';
      setLocalTransitioning(true);
    } else {
      playBack();
      pendingAction.current = 'back';
      setTransitioning(true);
    }
  }, [playBack, transitioning, globalTransitioning, openCategory, setTransitioning]);

  const handleMidpoint = useCallback(() => {
    if (pendingAction.current === 'open') {
      setOpenCategory(selected);
    } else if (pendingAction.current === 'back') {
      if (openCategory !== null) {
        setOpenCategory(null);
      } else {
        navigate('/');
      }
    }
    pendingAction.current = null;
  }, [selected, openCategory, navigate]);

  const handleComplete = useCallback(() => {
    setLocalTransitioning(false);
    setTransitioning(false);
  }, [setTransitioning]);

  const goHome = useCallback(() => {
    if (globalTransitioning) return;
    playBack();
    pendingAction.current = 'back';
    setTransitioning(true);
    setLocalTransitioning(true);
  }, [playBack, globalTransitioning, setTransitioning]);

  useKeyboard({
    onUp: () => {
      if (openCategory !== null) return;
      setSelected((s) => {
        const next = s > 0 ? s - 1 : projectCategories.length - 1;
        playTick();
        triggerNudge(next);
        return next;
      });
    },
    onDown: () => {
      if (openCategory !== null) return;
      setSelected((s) => {
        const next = s < projectCategories.length - 1 ? s + 1 : 0;
        playTick();
        triggerNudge(next);
        return next;
      });
    },
    onEnter: () => {
      if (openCategory === null) {
        openCat(selected);
      }
    },
    onBack: goBack,
    onNumber: (n) => {
      if (openCategory !== null) return;
      const idx = n - 1;
      if (idx >= 0 && idx < projectCategories.length) {
        setSelected(idx);
        playTick();
        openCat(idx);
      }
    },
    enabled: !transitioning && !globalTransitioning,
  });

  useEffect(() => {
    if (openCategory === null) {
      rowRefs.current[selected]?.focus({ preventScroll: true });
    }
  }, [selected, openCategory]);

  const activeCat = openCategory !== null ? projectCategories[openCategory] : null;

  return (
    <>
      <main className="section">
        <div className="section__header">
          <button
            ref={backRef}
            className="section__back mono-label"
            onClick={openCategory !== null ? goBack : goHome}
          >
            &#9664; {openCategory !== null ? 'Projects' : 'Index'}
          </button>
          <span className="mono-label">
            {openCategory !== null
              ? `01 / Projects / ${activeCat!.label}`
              : '01 / Projects'}
          </span>
          <span className="section__sample-tag mono-label">Sample entries</span>
        </div>

        {openCategory === null ? (
          <div className="projects-menu">
            <div className="projects-menu__body">
              <div className="projects-menu__left">
                <h2 className="section__title">Projects</h2>
                <p className="section__lede">Selected work across valuation, risk, and applied AI.</p>
              </div>
              <div className="projects-menu__right">
                <div className="projects-menu__header-block">
                  <span className="projects-menu__header-label">Select category</span>
                </div>
                <div className="projects-menu__list" role="list">
                  {projectCategories.map((cat, i) => (
                    <a
                      key={cat.id}
                      ref={(el) => { rowRefs.current[i] = el; }}
                      href={`#${cat.id}`}
                      role="listitem"
                      className={`projects-menu__row ${selected === i ? 'projects-menu__row--selected' : ''} ${nudge === i ? 'projects-menu__row--nudge' : ''}`}
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
                        openCat(i);
                      }}
                      tabIndex={selected === i ? 0 : -1}
                    >
                      <span className="projects-menu__index mono-label">{CATEGORY_INDICES[i]}</span>
                      <span className="projects-menu__label">{cat.label}</span>
                      <span className="projects-menu__count mono-label">
                        {selected === i ? `${cat.projects.length} ${cat.projects.length === 1 ? 'project' : 'projects'}` : ''}
                      </span>
                      <div className="projects-menu__bar" />
                    </a>
                  ))}
                  <div
                    className="projects-menu__marker"
                    style={{ transform: `translateY(${selected * 52}px)` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="projects-menu__hint mono-label">
                  Arrow keys navigate &middot; Enter selects &middot; Esc returns
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="projects-detail">
            <div className="projects-detail__body">
              <div className="projects-detail__left">
                <h2 className="section__title">{activeCat!.label}</h2>
                <p className="section__lede">{activeCat!.projects.length} projects</p>
              </div>
              <div className="projects-detail__right">
                <div className="projects-table">
                  <div className="projects-table__header">
                    <span className="mono-label">Project</span>
                    <span className="mono-label">Area</span>
                    <span className="mono-label">Tools</span>
                    <span className="mono-label">Year</span>
                  </div>
                  {activeCat!.projects.map((p) => (
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
            </div>
          </div>
        )}
      </main>

      {(transitioning || globalTransitioning) && (
        <ShutterTransition active={true} onMidpoint={handleMidpoint} onComplete={handleComplete} />
      )}
    </>
  );
}
