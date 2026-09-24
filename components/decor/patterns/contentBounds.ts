// Shared by any pattern that shouldn't draw behind the readable text
// column (honeycomb now, lines soon) - a dense grid or a web of
// connecting lines sitting directly behind a paragraph makes it much
// harder to read than the sparser dots/roots patterns do, so those two
// need to stay out of the middle of the screen entirely.

// Matches Container's max-w-5xl (1024px) from components/ui/Container.tsx
// - that's the actual pixel width of the page's content column once the
// viewport is wide enough for it to stop growing. Tailwind doesn't expose
// its pixel values to plain TypeScript at runtime, so this has to be kept
// in sync by hand if Container's max-width value is ever changed.
const CONTENT_MAX_WIDTH = 1024;

// Extra clearance beyond the exact edge of the content column, in pixels,
// so shapes don't end up visually touching the text - just being
// technically outside the column isn't quite the same as looking clear
// of it.
const CONTENT_MARGIN = 48;

export interface ContentBounds {
  left: number;
  right: number;
}

// The content column is always centered in the viewport (that's what
// Container's mx-auto does), so its left/right edges are just the
// viewport's width minus the column's width, split evenly - plus the
// margin above on each side. On a narrow (e.g. mobile) screen, the
// column fills the entire viewport width already, so left ends up
// negative and right ends up beyond the viewport's right edge - meaning
// the "excluded" zone covers the whole screen. That's intentional, not a
// bug: on a screen too narrow to have side margins at all, there's
// nowhere left for these patterns to draw without touching the text.
export function getContentBounds(viewportWidth: number): ContentBounds {
  const contentWidth = Math.min(viewportWidth, CONTENT_MAX_WIDTH);
  const left = (viewportWidth - contentWidth) / 2 - CONTENT_MARGIN;
  const right = viewportWidth - left;
  return { left, right };
}

// True if a shape centered at x, extending `radius` pixels to either
// side of that center, would overlap the content column at all. Using
// the shape's full radius (not just its center point) means a hexagon
// whose center is just outside the column, but whose edge would still
// poke into it, correctly still counts as overlapping.
export function overlapsContent(x: number, radius: number, bounds: ContentBounds): boolean {
  return x + radius > bounds.left && x - radius < bounds.right;
}

// The viewport width below which getContentBounds() excludes the entire
// screen - i.e. CONTENT_MAX_WIDTH plus both margins. Below this width,
// there is no space left outside the content column at all. Patterns
// that can't draw behind content (see avoidsContent in types.ts) use
// this to know they should skip themselves entirely on a narrow
// viewport, rather than getting picked and then rendering nothing.
export const MIN_WIDTH_FOR_SIDE_PATTERNS = CONTENT_MAX_WIDTH + CONTENT_MARGIN * 2;