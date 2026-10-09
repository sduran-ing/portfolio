"use client";

import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun02Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import { useIsClient } from "@/lib/hooks/useIsClient";

interface ThemeToggleProps {
  vertical?: boolean;
}

// The new theme sweeps in as an expanding circle
// centered on the click, instead of snapping instantly.
export default function ThemeToggle({ vertical = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  function handleToggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next = theme === "dark" ? "light" : "dark";

    const supportsViewTransitions = "startViewTransition" in document;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Skip the wipe entirely if the browser can't do it or the person has
    // asked for less motion — just flip the theme, no fallback animation.
    if (!supportsViewTransitions || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    // Distance from the click to the furthest screen corner, so the circle
    // always grows large enough to cover the entire viewport.
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  if (!isClient) {
    return null;
  }

  // The icon (and label) shown is the destination, not the current state:
  // sun while dark (switch TO light), moon while light (switch TO dark).
  const icon = theme === "dark" ? Sun02Icon : Moon02Icon;

  if (vertical) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        // justify-center needed since it's a flex row, so its icon+label need justify-content to center as a group, not just text-align
        className="flex w-full items-center justify-center gap-2 px-3 py-2 font-mono text-xs font-semibold text-muted transition-colors hover:text-accent cursor-pointer"
      >
        <HugeiconsIcon icon={icon} size={18} strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="text-muted transition-colors hover:text-accent cursor-pointer"
    >
      <HugeiconsIcon icon={icon} size={22} strokeWidth={1.5} />
    </button>
  );
}