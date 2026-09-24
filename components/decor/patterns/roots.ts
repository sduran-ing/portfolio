import type { Pattern, PatternGenerateContext, PatternDrawContext } from "./types";

interface RootSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  // Unlike every other pattern's growDelay (which is random per shape),
  // this is deliberately NOT random - it's handed down from growBranch()
  // below, based on how many steps into its branch this segment is (plus
  // whatever delay its parent branch had already accumulated before
  // forking off). That's what makes a branch visibly extend outward from
  // its origin over time, tip growing first, instead of its segments
  // popping in in a random order.
  growDelay: number;
}

const ORIGIN_COUNT = 3;
const STEP_LENGTH = 6;
const STEPS_PER_BRANCH = 40;
const MAX_BRANCH_DEPTH = 4;
const BRANCH_CHANCE = 0.04;
const CURVE_AMOUNT = 0.3;
const MAX_OPACITY = 0.3;

// How many seconds pass between one segment along a branch appearing and
// the next one appearing. Over a full 40-step branch, that's
// STEPS_PER_BRANCH * PER_STEP_DELAY seconds for the branch to fully grow
// from origin to tip - at 0.05, roughly 2 seconds. Raising this makes
// roots grow more slowly across the screen; lowering it makes them shoot
// out faster.
const PER_STEP_DELAY = 0.05;

// How long one individual (tiny, 6px) segment takes to fade in once its
// own delay arrives. Kept short and roughly equal to PER_STEP_DELAY, so
// consecutive segments' growth windows overlap slightly rather than
// leaving visible gaps between them as the branch extends.
const SEGMENT_GROW_DURATION = 0.08;

// The widest random head start difference between the three root
// origins, in seconds - enough that they don't all begin growing at the
// exact same instant, but small next to a branch's ~2 second total
// growth time.
const ORIGIN_STAGGER_MAX = 0.5;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function growBranch(
  segments: RootSegment[],
  noise2D: (x: number, y: number) => number,
  startX: number,
  startY: number,
  startAngle: number,
  depth: number,
  // The delay this branch itself starts from - for a fresh origin this
  // is just that origin's own stagger; for a forked branch, it's
  // whatever delay had already built up on its parent branch by the
  // point it forked, so the child genuinely starts growing only once the
  // parent has grown that far.
  startDelay: number
) {
  let x = startX;
  let y = startY;
  let angle = startAngle;
  let delay = startDelay;

  for (let step = 0; step < STEPS_PER_BRANCH; step++) {
    const turn = noise2D(x * 0.01, y * 0.01) * CURVE_AMOUNT;
    angle += turn;

    const nextX = x + Math.cos(angle) * STEP_LENGTH;
    const nextY = y + Math.sin(angle) * STEP_LENGTH;

    segments.push({ x1: x, y1: y, x2: nextX, y2: nextY, growDelay: delay });

    // Each step along the branch gets a slightly later delay than the
    // one before it - this single line is what produces the
    // grows-outward-from-the-origin effect.
    delay += PER_STEP_DELAY;

    x = nextX;
    y = nextY;

    // Forking spawns a second branch from this exact point, angled off
    // from the current direction, one depth level shallower and passing
    // along the CURRENT accumulated delay (not startDelay) - that's what
    // makes the fork begin growing exactly when the parent branch's
    // growth reaches this point, not before.
    if (depth > 0 && Math.random() < BRANCH_CHANCE) {
      const forkAngle = angle + (Math.random() - 0.5) * 1.4;
      growBranch(segments, noise2D, x, y, forkAngle, depth - 1, delay);
    }
  }
}

function generate({ width, height, noise2D }: PatternGenerateContext): RootSegment[] {
  const segments: RootSegment[] = [];

  for (let i = 0; i < ORIGIN_COUNT; i++) {
    const edge = Math.floor(Math.random() * 4);
    let startX = 0;
    let startY = 0;
    let startAngle = 0;

    if (edge === 0) {
      startX = Math.random() * width;
      startY = 0;
      startAngle = Math.PI / 2;
    } else if (edge === 1) {
      startX = width;
      startY = Math.random() * height;
      startAngle = Math.PI;
    } else if (edge === 2) {
      startX = Math.random() * width;
      startY = height;
      startAngle = -Math.PI / 2;
    } else {
      startX = 0;
      startY = Math.random() * height;
      startAngle = 0;
    }

    startAngle += (Math.random() - 0.5) * 0.8;

    const originDelay = Math.random() * ORIGIN_STAGGER_MAX;
    growBranch(segments, noise2D, startX, startY, startAngle, MAX_BRANCH_DEPTH, originDelay);
  }

  return segments;
}

function draw(
  segments: RootSegment[],
  { ctx, time, color, reducedMotion }: PatternDrawContext
) {
  for (const segment of segments) {
    const growElapsed = time - segment.growDelay;
    const growRaw = reducedMotion
      ? 1
      : Math.min(Math.max(growElapsed / SEGMENT_GROW_DURATION, 0), 1);
    const scale = easeOutCubic(growRaw);

    if (scale <= 0) continue;

    const currentX2 = segment.x1 + (segment.x2 - segment.x1) * scale;
    const currentY2 = segment.y1 + (segment.y2 - segment.y1) * scale;

    ctx.beginPath();
    ctx.moveTo(segment.x1, segment.y1);
    ctx.lineTo(currentX2, currentY2);
    ctx.strokeStyle = `rgba(${color}, ${MAX_OPACITY * scale})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

export const rootsPattern: Pattern<RootSegment[]> = { generate, draw };