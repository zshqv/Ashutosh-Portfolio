import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrambleText({ text, delay = 0, duration = 650, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion.current) {
      setDisplay(text);
      return;
    }

    const timeout = setTimeout(() => {
      startRef.current = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const result = text
          .split('')
          .map((char, i) => {
            if (char === ' ' || char === '/') return char;
            const charProgress = (i / text.length);
            if (progress > charProgress) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        setDisplay(result);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, delay, duration]);

  return <span className={className}>{display}</span>;
}
