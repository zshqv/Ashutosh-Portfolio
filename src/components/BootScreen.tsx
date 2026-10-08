import { useState, useEffect, useCallback, useRef } from 'react';
import { siteData } from '../data/site';
import './BootScreen.css';

const BOOT_LINES = [
  'Initialising portfolio',
  'Loading profile',
  'Loading projects',
  'Loading skills',
  'Syncing resume',
  'Session ready',
];

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setFading(true);
    try {
      sessionStorage.setItem('at-boot-done', '1');
    } catch (_e) {
      // storage unavailable
    }
    setTimeout(onComplete, 500);
  }, [onComplete]);

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      timerRef.current = setTimeout(finish, 600);
      return;
    }
    timerRef.current = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, 330);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visibleLines, finish]);

  useEffect(() => {
    const skip = (e: KeyboardEvent | MouseEvent) => {
      e.preventDefault();
      finish();
    };
    window.addEventListener('keydown', skip);
    window.addEventListener('click', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click', skip);
    };
  }, [finish]);

  const progress = BOOT_LINES.length > 0 ? visibleLines / BOOT_LINES.length : 0;

  return (
    <div className={`boot-screen ${fading ? 'boot-screen--fading' : ''}`}>
      <div className="boot-content">
        <div className="boot-logo">
          <div className="boot-logo__square">{siteData.initials}</div>
          <span className="boot-logo__text">
            {siteData.name} / Portfolio
          </span>
        </div>

        <div className="boot-log">
          {BOOT_LINES.map((line, i) => (
            <div
              key={line}
              className={`boot-log__line ${i < visibleLines ? 'boot-log__line--visible' : ''}`}
            >
              <span className="boot-log__label">{line}</span>
              <span className="boot-log__dots" />
              <span className="boot-log__status">OK</span>
            </div>
          ))}
        </div>

        <div className="boot-progress">
          <div className="boot-progress__fill" style={{ transform: `scaleX(${progress})` }}>
            <div className="boot-progress__cap" />
          </div>
        </div>

        <div className="boot-footer">
          <span className="mono-label">Version {siteData.version}</span>
          <span className="mono-label">Press any key to skip</span>
        </div>
      </div>
    </div>
  );
}
