import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useSound } from '../hooks/useSound';

type Theme = 'light' | 'dark';

interface AppContextValue {
  standardView: boolean;
  toggleStandardView: () => void;
  soundOn: boolean;
  toggleSound: () => boolean;
  playTick: () => void;
  playOpen: () => void;
  playBack: () => void;
  transitioning: boolean;
  setTransitioning: (v: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('at-theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {}
  return 'light';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [standardView, setStandardView] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const { tick, open, back, toggle } = useSound();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('at-theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleStandardView = useCallback(() => {
    setStandardView((v) => !v);
  }, []);

  const toggleSoundFn = useCallback(() => {
    const now = toggle();
    setSoundOn(now);
    return now;
  }, [toggle]);

  return (
    <AppContext.Provider
      value={{
        standardView,
        toggleStandardView,
        soundOn,
        toggleSound: toggleSoundFn,
        playTick: tick,
        playOpen: open,
        playBack: back,
        transitioning,
        setTransitioning,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
