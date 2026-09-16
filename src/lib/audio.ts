// Procedural Web Audio API soundscape & micro-interaction synthesizer
// Zero external assets needed, ultra-low latency, and fully controllable

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private ambientOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private currentStageColor: string = 'intro';

  public init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.ctx) return true;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbient();
      this.playChirp(520, 'sine', 0.15, 0.08);
    } else {
      this.stopAmbient();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setStageAmbient(stage: string) {
    this.currentStageColor = stage;
    if (this.isMuted || !this.ctx || this.ambientOscs.length === 0) return;

    const now = this.ctx.currentTime;
    let freqs = [110, 164.81, 220]; // Default Intro: A2, E3, A3

    if (stage === 'round01') {
      freqs = [130.81, 196.0, 261.63]; // C3, G3, C4 (Electric Blue / Tech clarity)
    } else if (stage === 'round02') {
      freqs = [146.83, 220.0, 293.66]; // D3, A3, D4 (Coral / Tension & Clash)
    } else if (stage === 'round03') {
      freqs = [174.61, 261.63, 349.23]; // F3, C4, F4 (Purple / Mystery & Imagination)
    } else if (stage === 'final') {
      freqs = [196.0, 293.66, 392.0]; // G3, D4, G4 (Gold / Radiance & Triumph)
    }

    this.ambientOscs.forEach((item, idx) => {
      if (freqs[idx]) {
        item.osc.frequency.setTargetAtTime(freqs[idx], now, 0.8);
      }
    });
  }

  private startAmbient() {
    if (!this.ctx || this.isMuted) return;

    if (this.ambientOscs.length > 0) return;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    masterGain.connect(this.ctx.destination);
    this.ambientGain = masterGain;

    const frequencies = [110, 164.81, 220];

    frequencies.forEach((f) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(masterGain);

      osc.start();
      this.ambientOscs.push({ osc, gain });
    });
  }

  private stopAmbient() {
    if (this.ambientOscs.length === 0) return;
    this.ambientOscs.forEach((item) => {
      try {
        item.osc.stop();
        item.osc.disconnect();
      } catch {}
    });
    this.ambientOscs = [];
  }

  // Micro-interaction sounds
  public playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  public playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  public playEliminationImpact() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  public playTriumph() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const noteTime = now + i * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.03, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.35);
      });
    } catch {}
  }

  public playChirp(freq = 600, type: OscillatorType = 'sine', duration = 0.1, vol = 0.03) {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.01);
    } catch {}
  }
}

export const sound = new SoundEngine();

