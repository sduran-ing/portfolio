// Shared contract every pattern module implements. BackgroundPattern.tsx
// owns the canvas lifecycle (sizing, theme color, the animation loop,
// resize handling) and just calls into whichever pattern got randomly
// picked - each pattern only has to know how to build its own shapes and
// how to draw one frame of them. That split is what lets four very
// different-looking patterns (dots, lines, roots, honeycomb) share one
// engine instead of four separate copies of the canvas setup code.

export interface PatternGenerateContext {
  width: number;
  height: number;
  // A 2D noise function (from simplex-noise): given any (x, y), always
  // returns the same value in the range -1..1 for that input. Used
  // instead of Math.random() wherever we want positions that feel
  // organically clustered rather than uniformly scattered - noise
  // produces smooth "hills and valleys" of values, so nearby inputs
  // produce nearby outputs, which is what makes noise-placed points look
  // natural instead of like static.
  noise2D: (x: number, y: number) => number;
}

export interface PatternDrawContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  // Seconds since the animation started - NOT milliseconds. Dividing by
  // 1000 once in BackgroundPattern.tsx means every pattern's speed
  // constants can stay in small, readable numbers instead of huge
  // millisecond values.
  time: number;
  // "r, g, b" string (no rgba() wrapper) - each pattern builds its own
  // rgba(...) strings from this so it can control opacity per-shape.
  color: string;
  // When true, every pattern should draw its shapes at a fixed resting
  // state (no pulsing) - this context object doesn't enforce that itself,
  // each pattern's own draw() checks it and skips the animated math.
  reducedMotion: boolean;
}

export interface Pattern<T> {
  generate: (context: PatternGenerateContext) => T;
  draw: (data: T, context: PatternDrawContext) => void;
  // True for patterns that skip the content column (honeycomb, and soon
  // lines) - the orchestrator uses this to exclude them from the random
  // pick entirely on narrow viewports, where they'd otherwise render
  // nothing at all rather than a genuinely empty-but-intentional result.
  avoidsContent?: boolean;
}