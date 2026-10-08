import { useMemo } from 'react';
import './Reticle.css';

interface ReticleProps {
  menuIndex: number;
}

export function Reticle({ menuIndex }: ReticleProps) {
  const offsetY = useMemo(() => menuIndex * 6, [menuIndex]);

  return (
    <div
      className="reticle"
      style={{ transform: `translate(${menuIndex * 3}px, ${offsetY}px)` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 400" width="400" height="400">
        <circle cx="200" cy="200" r="180" fill="none" stroke="var(--line-soft)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="var(--line-soft)" strokeWidth="0.5" strokeDasharray="8 6" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="var(--line-soft)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="var(--line-soft)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="200" y1="10" x2="200" y2="390" stroke="var(--line-soft)" strokeWidth="0.3" />
        <line x1="10" y1="200" x2="390" y2="200" stroke="var(--line-soft)" strokeWidth="0.3" />
      </svg>
    </div>
  );
}
