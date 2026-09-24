import type { Pattern, PatternGenerateContext, PatternDrawContext } from "./types";
import { getContentBounds, overlapsContent } from "./contentBounds";

interface Hexagon {
  cx: number;
  cy: number;
  // Seconds after the animation starts before this hexagon begins
  // growing in. Randomized per hexagon so the whole grid fills in
  // gradually, staggered, rather than every hexagon starting to grow at
  // the exact same instant.
  growDelay: number;
  // How many seconds this hexagon's own growth takes, once it starts.
  // Randomized slightly per hexagon (not one fixed number for all of
  // them) so the reveal doesn't look perfectly mechanical.
  growDuration: number;
}

// Distance from a hexagon's center to each of its 6 corners, in pixels.
// Bigger = larger, more sparse hexagons (fewer needed to cover the
// screen); smaller = a denser, finer honeycomb grid.
const HEX_SIZE = 70;

// Peak opacity a fully-grown hexagon's outline reaches - never fully
// opaque, so it stays a subtle background detail rather than a shape
// that competes for attention.
const MAX_OPACITY = 0.3;

// The widest possible random delay before any given hexagon starts
// growing, in seconds. Every hexagon gets its own random delay between 0
// and this number, so the grid fills in gradually across roughly this
// many seconds rather than all at once. Raising this spreads the reveal
// out over more time; lowering it makes every hexagon start growing
// closer to the same moment.
const GROWTH_DELAY_MAX = 2.5;

// The range of how long one hexagon's own growth takes, once its delay
// has elapsed. Randomized per hexagon (rather than one fixed duration)
// so hexagons don't all finish growing in at visibly identical speeds.
const GROWTH_DURATION_MIN = 0.8;
const GROWTH_DURATION_MAX = 1.6;

// Eases a 0..1 value so growth starts fast and settles in gently at the
// end, instead of growing at a constant (and rather mechanical-looking)
// linear rate. This specific shape is called "ease-out cubic" - the
// cubic (t^3) term is what gives it that fast-then-settling curve.
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function generate({ width, height }: PatternGenerateContext): Hexagon[] {
  // Unlike dots, lines, and roots, a honeycomb isn't noise-scattered at
  // all - real honeycombs are a precise repeating grid, so this uses
  // straightforward hexagon-tiling geometry instead of noise2D. noise2D
  // simply isn't used in this function - it's still part of the shared
  // PatternGenerateContext because other patterns need it, but honeycomb
  // doesn't.
  const hexWidth = HEX_SIZE * 2;
  const hexHeight = Math.sqrt(3) * HEX_SIZE;
  // Adjacent hexagon columns overlap by a quarter of their width, since
  // that's how much horizontal space a hexagon's slanted top/bottom
  // edges "give back" to its neighbor - packing columns at the full
  // hexWidth would leave visible gaps between columns.
  const colSpacing = hexWidth * 0.75;

  // +2 on each axis so hexagons still get drawn slightly off-screen at
  // the edges - without this, the grid would visibly cut off with a
  // straight edge exactly at the viewport boundary instead of appearing
  // to continue infinitely in every direction.
  const cols = Math.ceil(width / colSpacing) + 2;
  const rows = Math.ceil(height / hexHeight) + 2;

  // The horizontal pixel range the page's readable content occupies -
  // any hexagon whose shape would overlap this range gets skipped below,
  // so the grid only ever appears in the side margins, never behind text.
  const bounds = getContentBounds(width);

  const hexagons: Hexagon[] = [];
  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const cx = col * colSpacing;
      // Every other column is offset by half a hexagon's height - this
      // vertical stagger is what makes hexagons interlock into a
      // honeycomb instead of just stacking in a plain rectangular grid.
      const cy = row * hexHeight + (col % 2 !== 0 ? hexHeight / 2 : 0);

      // Skip any hexagon that would overlap the content column - this is
      // the actual "only appear at the sides" rule. HEX_SIZE is passed
      // as the radius since that's the furthest any point of the
      // hexagon's outline reaches from its center.
      if (overlapsContent(cx, HEX_SIZE, bounds)) {
        continue;
      }

      hexagons.push({
        cx,
        cy,
        growDelay: Math.random() * GROWTH_DELAY_MAX,
        growDuration:
          GROWTH_DURATION_MIN + Math.random() * (GROWTH_DURATION_MAX - GROWTH_DURATION_MIN),
      });
    }
  }

  return hexagons;
}

function draw(
  hexagons: Hexagon[],
  { ctx, time, color, reducedMotion }: PatternDrawContext
) {
  for (const hex of hexagons) {
    // How far into this hexagon's own growth window the animation
    // currently is, from 0 (hasn't started, still invisible) to 1 (fully
    // grown, stays at 1 forever after - no pulsing once it gets there).
    // Clamped so it can't go negative (before growDelay has elapsed) or
    // above 1 (once growDuration has fully played out). For reduced
    // motion, every hexagon is simply drawn already fully grown.
    const growElapsed = time - hex.growDelay;
    const growRaw = reducedMotion
      ? 1
      : Math.min(Math.max(growElapsed / hex.growDuration, 0), 1);
    const scale = easeOutCubic(growRaw);

    if (scale <= 0) continue;

    ctx.beginPath();
    // A flat-top hexagon's 6 corners sit at 60-degree intervals starting
    // from 0 radians (pointing right). Math.PI / 3 is 60 degrees in
    // radians. Each corner's distance from the center is HEX_SIZE * scale
    // - not just HEX_SIZE - which is what makes the whole hexagon grow
    // outward from its center point as scale climbs from 0 to 1, rather
    // than popping in at full size with only its opacity changing.
    for (let corner = 0; corner < 6; corner++) {
      const angle = (Math.PI / 3) * corner;
      const x = hex.cx + HEX_SIZE * scale * Math.cos(angle);
      const y = hex.cy + HEX_SIZE * scale * Math.sin(angle);
      if (corner === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();

    // Stroked outline only, never filled - a filled honeycomb would read
    // as a much heavier, more solid shape than the light, airy quality
    // the other patterns share.
    ctx.strokeStyle = `rgba(${color}, ${MAX_OPACITY * scale})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// avoidsContent: true tells BackgroundPattern.tsx's random picker to
// leave this pattern out of the running entirely on narrow viewports,
// where getContentBounds() would exclude the whole screen and this
// pattern would otherwise get picked and then draw nothing at all.
export const honeycombPattern: Pattern<Hexagon[]> = { generate, draw, avoidsContent: true };