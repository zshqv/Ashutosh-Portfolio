import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useKeyboard } from '../hooks/useKeyboard';
import { ShutterTransition } from './ShutterTransition';
import './SectionLayout.css';

interface SectionLayoutProps {
  index: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}

export function SectionLayout({ index, title, lede, children }: SectionLayoutProps) {
  const navigate = useNavigate();
  const { playBack, transitioning, setTransitioning } = useApp();
  const pendingBack = useRef(false);

  const goBack = useCallback(() => {
    if (transitioning) return;
    playBack();
    pendingBack.current = true;
    setTransitioning(true);
  }, [playBack, transitioning, setTransitioning]);

  const handleMidpoint = useCallback(() => {
    if (pendingBack.current) {
      navigate('/');
      pendingBack.current = false;
    }
  }, [navigate]);

  const handleComplete = useCallback(() => {
    setTransitioning(false);
  }, [setTransitioning]);

  useKeyboard({
    onUp: () => {},
    onDown: () => {},
    onEnter: () => {},
    onBack: goBack,
    enabled: !transitioning,
  });

  return (
    <>
      <main className="section">
        <div className="section__header">
          <button className="section__back mono-label" onClick={goBack}>
            &#9664; Index
          </button>
          <span className="mono-label">{index} / {title}</span>
          <span className="section__sample-tag mono-label">Sample entries</span>
        </div>

        <div className="section__body">
          <div className="section__left">
            <h2 className="section__title">{title}</h2>
            <p className="section__lede">{lede}</p>
          </div>
          <div className="section__right" id={`section-${title.toLowerCase()}`}>
            {children}
          </div>
        </div>
      </main>

      {transitioning && (
        <ShutterTransition active={true} onMidpoint={handleMidpoint} onComplete={handleComplete} />
      )}
    </>
  );
}
