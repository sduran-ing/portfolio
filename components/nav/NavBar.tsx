"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import { navContainer, navItem } from "@/lib/utils/introMotion";
import NavLinks from "./NavLinks";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

// Hides on scroll down, reveals on scroll up,
// goes translucent once scrolled, and swaps between the desktop layout
// (links + controls inline) and MobileMenu (hamburger + floating button)
// at the md breakpoint. That swap is plain CSS (hidden / md:flex) — no JS
// media-query check needed.
//
// On first page load, the logo, each nav link, and each toggle slide
// down into place one at a time (see lib/utils/introMotion.ts) - phase 1
// of the page's overall entrance sequence, with Hero picking up as
// phase 2 once this finishes.
export default function NavBar() {
  const { direction, isScrolled } = useScrollDirection();
  const headerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // MobileMenu's dropdown panel needs to know exactly how tall this header
  // is, so it can sit right below it instead of using a hardcoded pixel
  // guess that would drift out of sync whenever this height changes.
  // Publishing it as a CSS variable on the root element means MobileMenu
  // can read it directly, without any prop drilling between the two.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    function updateHeight() {
      // Non-null assertion is safe: the effect already returned above if
      // header was null, and this ref's target doesn't change afterward.
      document.documentElement.style.setProperty(
        "--nav-height",
        `${header!.offsetHeight}px`
      );
    }

    updateHeight();
    // ResizeObserver, not just one measurement on mount — keeps this
    // correct if the header's height ever changes later (breakpoint
    // change, font swap causing reflow, etc.).
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 shadow-md transition-all duration-300 ${
        // Solid background at the very top of the page; translucent with a
        // blur once scrolled, so content behind it stays legible.
        isScrolled
          ? "bg-surface/60 backdrop-blur-md"
          : "bg-surface"
      } ${direction === "down" ? "-translate-y-full" : "translate-y-0"}`}
    >
      {/*
        This is the stagger parent for phase 1 of the page's entrance -
        every direct motion child below (the logo) and every nested one
        (each link inside NavLinks, the language switch, the theme
        toggle) shares the navItem variant, so Framer Motion staggers all
        of them together in render order, regardless of NavLinks being a
        separate component rather than inline JSX here.
      */}
      <motion.div
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={navContainer}
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5"
      >
        {/* A proper noun, not translated content, so it's hardcoded here
            rather than living in the content files. */}
        <motion.a
          variants={navItem}
          href="#top"
          className="font-heading text-xl font-semibold text-ink"
        >
          Santiago Duran
        </motion.a>

        {/* Desktop: links and controls inline, hidden below md */}
        <div className="hidden items-center gap-10 md:flex">
          <NavLinks animated />
          <div className="flex items-center gap-4">
            <motion.div variants={navItem}>
              <LanguageSwitch />
            </motion.div>
            <motion.div variants={navItem}>
              <ThemeToggle />
            </motion.div>
          </div>
        </div>

        {/* Mobile: hamburger + floating button, hidden at md and above.
            The phase-3 fade for both of these lives inside MobileMenu.tsx
            itself now, not here - see that file's comments for why a
            wrapper at this level can't reach the portaled floating
            button. */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </motion.div>
    </header>
  );
}