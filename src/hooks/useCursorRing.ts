import { useEffect, useRef } from 'react';

export function useCursorRing(active: boolean) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const scale = useRef(1);
  const targetScale = useRef(1);
  const rafId = useRef(0);

  useEffect(() => {
    if (!active) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduced || !isFinePointer) return;

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    ringRef.current = ring;
    dotRef.current = dot;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a, button, [role="button"]')) {
        targetScale.current = 1.7;
      } else {
        targetScale.current = 1;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.22);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.22);
      scale.current = lerp(scale.current, targetScale.current, 0.15);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 14}px, ${pos.current.y - 14}px) scale(${scale.current})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 1.5}px, ${pos.current.y - 1.5}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId.current);
      ring.remove();
      dot.remove();
      ringRef.current = null;
      dotRef.current = null;
    };
  }, [active]);
}
