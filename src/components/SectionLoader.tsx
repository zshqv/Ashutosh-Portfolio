import { useState, useEffect, useRef } from 'react';
import './SectionLoader.css';

interface SectionLoaderProps {
  items: string[];
  delay?: number;
  onComplete: () => void;
}

export function SectionLoader({ items, delay = 280, onComplete }: SectionLoaderProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const doneRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisibleCount(items.length);
      onComplete();
      return;
    }

    if (visibleCount >= items.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        timerRef.current = setTimeout(onComplete, 300);
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      setVisibleCount((v) => v + 1);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visibleCount, items.length, delay, onComplete]);

  const progress = items.length > 0 ? visibleCount / items.length : 0;

  return (
    <div className="section-loader">
      <div className="section-loader__log">
        {items.map((item, i) => (
          <div
            key={item}
            className={`section-loader__line ${i < visibleCount ? 'section-loader__line--visible' : ''}`}
          >
            <span className="section-loader__label">{item}</span>
            <span className="section-loader__dots" />
            <span className="section-loader__status">OK</span>
          </div>
        ))}
      </div>
      <div className="section-loader__progress">
        <div
          className="section-loader__fill"
          style={{ transform: `scaleX(${progress})` }}
        >
          <div className="section-loader__cap" />
        </div>
      </div>
    </div>
  );
}
