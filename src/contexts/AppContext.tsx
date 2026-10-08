import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useSound } from '../hooks/useSound';

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
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [standardView, setStandardView] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const { tick, open, back, toggle } = useSound();

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
