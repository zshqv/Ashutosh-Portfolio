import { useEffect, useCallback } from 'react';

interface UseKeyboardOptions {
  onUp: () => void;
  onDown: () => void;
  onEnter: () => void;
  onBack: () => void;
  onNumber?: (n: number) => void;
  enabled?: boolean;
}

export function useKeyboard({
  onUp,
  onDown,
  onEnter,
  onBack,
  onNumber,
  enabled = true,
}: UseKeyboardOptions) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          onUp();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          onDown();
          break;
        case 'Enter':
          e.preventDefault();
          onEnter();
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          onBack();
          break;
        default:
          if (onNumber && e.key >= '1' && e.key <= '6') {
            e.preventDefault();
            onNumber(parseInt(e.key, 10));
          }
      }
    },
    [onUp, onDown, onEnter, onBack, onNumber, enabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}
