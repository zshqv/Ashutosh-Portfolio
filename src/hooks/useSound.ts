import { useRef, useCallback } from 'react';

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, startTime: number, ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.06, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function useSound() {
  const enabled = useRef(false);

  const tick = useCallback(() => {
    if (!enabled.current) return;
    const ctx = getCtx();
    playTone(1200, 0.06, ctx.currentTime, ctx);
  }, []);

  const open = useCallback(() => {
    if (!enabled.current) return;
    const ctx = getCtx();
    playTone(600, 0.1, ctx.currentTime, ctx);
    playTone(900, 0.1, ctx.currentTime + 0.08, ctx);
  }, []);

  const back = useCallback(() => {
    if (!enabled.current) return;
    const ctx = getCtx();
    playTone(900, 0.1, ctx.currentTime, ctx);
    playTone(600, 0.1, ctx.currentTime + 0.08, ctx);
  }, []);

  const toggle = useCallback(() => {
    enabled.current = !enabled.current;
    if (enabled.current) {
      getCtx();
    }
    return enabled.current;
  }, []);

  return { tick, open, back, toggle, enabled };
}
