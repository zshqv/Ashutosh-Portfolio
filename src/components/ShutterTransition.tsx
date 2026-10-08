import { useEffect, useState, useCallback } from 'react';
import './ShutterTransition.css';

interface ShutterTransitionProps {
  active: boolean;
  onMidpoint: () => void;
  onComplete: () => void;
}

export function ShutterTransition({ active, onMidpoint, onComplete }: ShutterTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'enter' | 'hold' | 'exit'>('idle');

  const run = useCallback(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onMidpoint();
      onComplete();
      return;
    }
    setPhase('enter');
    setTimeout(() => {
      setPhase('hold');
      onMidpoint();
      setTimeout(() => {
        setPhase('exit');
        setTimeout(() => {
          setPhase('idle');
          onComplete();
        }, 350);
      }, 80);
    }, 350);
  }, [onMidpoint, onComplete]);

  useEffect(() => {
    if (active) run();
  }, [active, run]);

  if (phase === 'idle') return null;

  return (
    <div className="shutter" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`shutter__bar shutter__bar--${i} shutter__bar--${phase}`}
        />
      ))}
    </div>
  );
}
