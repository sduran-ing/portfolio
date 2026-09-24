"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { createNoise2D } from "simplex-noise";
import { patterns } from "./patterns";
import { MIN_WIDTH_FOR_SIDE_PATTERNS } from "./patterns/contentBounds";

// Canvas drawing needs an explicit color string at the moment it paints -
// it isn't part of the CSS cascade the way a className is, so it can't
// just inherit var(--color-muted) automatically. These need to be kept in
// sync by hand with globals.css if that palette ever changes.
const PATTERN_COLOR = {
  dark: "112, 100, 94",
  light: "207, 195, 177",
};

// Full-page decorative background: one pattern (dots, lines, roots, or
// honeycomb - see components/decor/patterns/) is picked at random every
// page load and gently breathes for as long as the page stays open.
// This file only owns the shared plumbing every pattern needs (canvas
// sizing, the animation loop, theme color, resize handling); the actual
// shapes and how they're drawn live in each pattern's own file.
export default function BackgroundPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<"dark" | "light">("dark");
  const drawRef = useRef<((timestamp: number) => void) | null>(null);
  const { resolvedTheme } = useTheme();

  // A ref, not state - the animation loop below reads this every frame
  // without needing to restart itself whenever the theme changes.
  useEffect(() => {
    themeRef.current = resolvedTheme === "light" ? "light" : "dark";
    // Forces one immediate repaint with the new color. This matters
    // specifically for the prefers-reduced-motion case below, where the
    // animation loop draws exactly once and then stops - without this
    // call, a theme toggle after that point wouldn't visibly update the
    // pattern's color until something else happened to trigger a redraw.
    drawRef.current?.(performance.now());
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const noise2D = createNoise2D();

    // Reads the canvas's current width before picking, so a narrow viewport
// excludes any pattern that can't draw around the content column
// (honeycomb now, lines once it gets the same treatment) - otherwise
// that pattern could get picked and then render nothing at all, since
// getContentBounds() would exclude the entire screen for it.
const { width: initialWidth } = canvas.getBoundingClientRect();
const eligiblePatterns =
  initialWidth < MIN_WIDTH_FOR_SIDE_PATTERNS
    ? patterns.filter((p) => !p.avoidsContent)
    : patterns;
const pattern = eligiblePatterns[Math.floor(Math.random() * eligiblePatterns.length)];

    // Whatever generate() returns for the pattern picked above - Dot[],
    // Connection[], RootSegment[], or Hexagon[], depending which pattern
    // this turned out to be. It's always passed straight back into that
    // same pattern's own draw() a few lines down, so the two stay
    // consistent with each other even though this file itself doesn't
    // know or care which specific shape it's holding.
    let patternData: ReturnType<typeof pattern.generate>;
    let animationFrame: number;

    function resize() {
      const { width, height } = canvas!.getBoundingClientRect();
      // devicePixelRatio scaling keeps the canvas sharp on high-DPI
      // (retina) screens - without it, the pattern would look slightly
      // blurry on most modern laptops and phones.
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
      patternData = pattern.generate({ width, height, noise2D });
    }

    function draw(timestamp: number) {
      const { width, height } = canvas!.getBoundingClientRect();
      ctx!.clearRect(0, 0, width, height);

      pattern.draw(
        // TypeScript can't verify this call is safe: `pattern` has type
        // Pattern<Dot[]> | Pattern<Connection[]> | Pattern<RootSegment[]>
        // | Pattern<Hexagon[]>, so calling .draw() on it requires an
        // argument satisfying ALL FOUR shapes at once - which is
        // impossible, since a Dot and a Connection share no fields. This
        // is a known false positive for exactly this pattern (a
        // runtime-picked union where generate() and draw() are always
        // called on the same object, so they're actually always in
        // agreement) - the cast below is safe by construction, verified
        // by how this file is written, not by the type checker itself.
        patternData as never,
        {
          ctx: ctx!,
          width,
          height,
          // Seconds, not milliseconds - keeps every pattern's own speed
          // constants small and readable.
          time: timestamp / 1000,
          color: PATTERN_COLOR[themeRef.current],
          reducedMotion: prefersReducedMotion,
        }
      );

      // Only keeps looping if motion is actually wanted - for reduced
      // motion, one static frame is drawn and the loop simply never
      // restarts, so there's no ongoing battery/CPU cost at all.
      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    drawRef.current = draw;
    resize();
    animationFrame = requestAnimationFrame(draw);

    // Regenerates the pattern's shapes for the new size on resize - it
    // does not pick a new random pattern type, and does not replay any
    // kind of intro animation, since the breathing pulse is continuous
    // and ongoing already, not a one-time reveal.
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}