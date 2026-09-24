"use client";

import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

interface ScrollState {
  direction: ScrollDirection;
  isScrolled: boolean;
}

// Tracks both whether the page is scrolling up or down (drives NavBar's
// hide/show) and whether it's scrolled past the very top at all (drives
// NavBar's solid-vs-translucent background). Both come from one shared
// scroll listener rather than two separate hooks each attaching their own,
// since NavBar always needs them together.
export function useScrollDirection(threshold = 10) {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    isScrolled: false,
  });
  // A ref, not state: we need the last position on every scroll event
  // (which can fire dozens of times a second), but only want a re-render
  // when direction or isScrolled actually change.
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;
      const isScrolled = currentScrollY > 0;

      // Ignore tiny movements for direction (trackpad jitter, momentum
      // overshoot) so the nav doesn't flicker on every few-pixel wobble.
      // isScrolled still updates on every event though — it can flip right
      // at the top of the page (0px to a few px) without ever crossing the
      // direction threshold.
      if (Math.abs(difference) < threshold) {
        setState((prev) => ({ ...prev, isScrolled }));
        return;
      }

      setState({ direction: difference > 0 ? "down" : "up", isScrolled });
      lastScrollY.current = currentScrollY;
    }

    // passive: true tells the browser this handler will never block
    // scrolling (no preventDefault), so scrolling stays smooth.
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return state;
}