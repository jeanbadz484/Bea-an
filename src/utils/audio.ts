/**
 * Sound synthesizer using Web Audio API for safe, zero-dependency,
 * toddler-friendly sound effects (pops, chimes, fanfares, clicks).
 */

class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public speechEnabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Playful pop sound (like popping a soap bubble)
  playPop(freq: number = 420) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio context might fail on restricted environments
    }
  }

  // Bright cheerful chime
  playChime(note: number = 523.25) { // C5 default
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch {}
  }

  // Magnetic snap sound for jigsaw puzzle pieces
  playSnap() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Click tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.06);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);

      // Followed by a short chime
      setTimeout(() => this.playChime(784), 40); // G5
    } catch {}
  }

  // Soft brush / scribble sound
  playBrush() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220 + Math.random() * 80, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  }

  // Little star sparkle sound
  playTwinkle() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playPop(freq);
      }, idx * 70);
    });
  }

  // Major celebration fanfare (C - E - G - high C)
  playCelebration() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      chord.forEach((freq, i) => {
        setTimeout(() => {
          this.playChime(freq);
        }, i * 90);
      });
    } catch {}
  }

  // Toddler-friendly spoken cue (e.g. "Great job!", "Letter A!")
  speak(text: string) {
    if (!this.speechEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.3; // slightly friendly higher pitch
      utterance.rate = 0.9;  // clear, unhurried pace
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis unsupported or blocked
    }
  }
}

export const sound = new SoundController();
