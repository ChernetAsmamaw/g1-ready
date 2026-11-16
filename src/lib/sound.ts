// Tiny optional sound effects made with Web Audio (no files to load).
let ctx: AudioContext | null = null;

function tone(freqs: number[], dur = 0.12) {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = ctx || new AC();
    const t0 = ctx.currentTime;
    freqs.forEach((f, i) => {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const s = t0 + i * dur;
      g.gain.setValueAtTime(0.0001, s);
      g.gain.exponentialRampToValueAtTime(0.18, s + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, s + dur);
      o.connect(g).connect(ctx!.destination);
      o.start(s);
      o.stop(s + dur + 0.02);
    });
  } catch {
    /* audio not available */
  }
}

export const sfx = {
  right: () => tone([660, 880]),
  wrong: () => tone([300, 220], 0.15),
  done: () => tone([523, 659, 784, 1046], 0.11),
};
