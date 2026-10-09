"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, PaintBoardIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { phase3Item } from "@/lib/utils/introMotion";
import { SOCIAL_LINKS } from "@/lib/utils/constants";
import MobileDrawer from "./MobileDrawer";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";

// Tailwind's default "md" breakpoint (768px), hardcoded here because it
// needs to be checked in JavaScript (to force-close this menu on resize),
// not just in CSS. If the breakpoint is ever customized in Tailwind's
// config, this needs to be updated to match.
const DESKTOP_BREAKPOINT = "(min-width: 768px)";

export default function MobileMenu() {
  // linksOpen is the slide-in drawer with the section links; styleOpen is
  // the small language/theme panel above the floating button.
  const [linksOpen, setLinksOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);

  // document.body doesn't exist during server rendering, so the portals
  // below only render once we know we're actually in the browser.
  const isClient = useIsClient();

  // Phase 3 of the page's entrance sequence (lib/utils/introMotion.ts).
  // This can't be applied from NavBar.tsx by wrapping <MobileMenu />
  // there instead - the floating style button below renders through a
  // portal straight to document.body, so despite how it looks in the
  // React tree, it is not actually a DOM descendant of anything in
  // NavBar. An opacity animation on some ancestor sitting in NavBar
  // would simply never reach it. Applying phase3Item directly to each
  // element that needs it, here in this file, is what actually works.
  const shouldReduceMotion = useReducedMotion();

  // Refs for the style panel's click-outside check below. The links
  // drawer doesn't need any: its overlay handles "tap outside" by itself.
  const styleButtonRef = useRef<HTMLButtonElement>(null);
  const stylePanelRef = useRef<HTMLDivElement>(null);

  // Freezes the page while the drawer is open, so the background can't
  // scroll underneath the blur. Closing the drawer by any route (link, X,
  // overlay, Escape, resize) flips linksOpen to false, which runs this
  // again and unfreezes the page.
  useEffect(() => {
    document.body.style.overflow = linksOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [linksOpen]);

  // Escape closes the drawer. Only listens while it's open, so it isn't
  // sitting on every keypress on the page for no reason.
  useEffect(() => {
    if (!linksOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLinksOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [linksOpen]);

  // Closes the style panel on a click anywhere outside of it, but not on
  // its own trigger button. That button's onClick already handles
  // toggling; if this handler also reacted to clicks on the button, the
  // two would race and the panel could immediately reopen right after
  // closing.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        styleOpen &&
        !stylePanelRef.current?.contains(target) &&
        !styleButtonRef.current?.contains(target)
      ) {
        setStyleOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [styleOpen]);

  // Force-closes both panels if the window is ever resized past the
  // desktop breakpoint. Without this, a panel opened on mobile stayed
  // rendered even after resizing to desktop width, because its portal
  // escapes NavBar's md:hidden wrapper entirely - that wrapper only ever
  // hid the trigger buttons, never the portaled panels themselves.
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);

    function handleChange(event: MediaQueryListEvent | MediaQueryList) {
      if (event.matches) {
        setLinksOpen(false);
        setStyleOpen(false);
      }
    }

    // Runs once immediately too, in case the page already loaded desktop-sized.
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      {/* This button only ever opens the drawer now. Once it's open, the
          drawer's overlay covers this button, so the X lives inside the
          drawer instead of this icon swapping to an X like it used to. */}
      <motion.button
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={phase3Item}
        type="button"
        onClick={() => {
          setStyleOpen(false);
          setLinksOpen(true);
        }}
        aria-expanded={linksOpen}
        aria-label="Open menu"
        className="text-ink"
      >
        <HugeiconsIcon icon={Menu01Icon} size={22} strokeWidth={1.5} />
      </motion.button>

      {/*
        Everything below renders via createPortal straight into
        document.body. NavBar's header has a CSS transform on it (for the
        scroll hide/show slide), and a transformed ancestor becomes the
        positioning reference for any position:fixed descendant instead of
        the actual browser viewport. Portaling to document.body sidesteps
        that: these elements are no longer descendants of the transformed
        header at all.
      */}

      {/* The drawer is always mounted inside this portal (when on the
          client) and decides for itself whether to show anything - that's
          what lets AnimatePresence inside it play the exit animation. */}
      {isClient && (
        <PortalToBody>
          <MobileDrawer open={linksOpen} onClose={() => setLinksOpen(false)} />
        </PortalToBody>
      )}

      {isClient && (
        <PortalToBody>
          {/* Phase 3 applied here directly (not from NavBar.tsx) since
              this whole div, button included, is what actually ends up
              in the DOM once portaled - see the comment on
              shouldReduceMotion above for why. */}
          <motion.div
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={phase3Item}
            className="fixed bottom-6 right-6 z-50"
          >
            {styleOpen && <StylePanel panelRef={stylePanelRef} />}
            <button
              ref={styleButtonRef}
              type="button"
              onClick={() => setStyleOpen((open) => !open)}
              aria-expanded={styleOpen}
              aria-label="Language and theme settings"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-surface text-accent shadow-md"
            >
              <HugeiconsIcon icon={PaintBoardIcon} size={30} strokeWidth={1.5} />
            </button>
          </motion.div>
        </PortalToBody>
      )}
    </>
  );
}

// Small wrapper so the createPortal calls above don't need their own
// inline JSX comments explaining the target - the name says it.
function PortalToBody({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body);
}

// One shared border wraps LanguageSwitch and ThemeToggle as a single
// vertical list (EN / ES / FR / Theme), instead of two separately-bordered
// pieces stacked with a gap. That mismatch (a wide horizontal control
// sitting above a lone icon) was the "doesn't look clean" problem. Both
// components' vertical prop drops their own border so this wrapper can own
// the one shared outline instead.
function StylePanel({ panelRef }: { panelRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={panelRef}
      className="mb-3 w-12 overflow-hidden rounded-md border border-muted bg-surface"
    >
      <LanguageSwitch vertical />

      {/* A plain <a> with a mailto: link instead of a <button>, because it
          navigates (opens the user's mail app) rather than toggling
          something. SOCIAL_LINKS.email already includes the "mailto:"
          prefix, so it's used as-is here. The icon has no visible text, so
          aria-label is what screen readers announce. */}
      <a
        href={SOCIAL_LINKS.email}
        aria-label="Send an email"
        className="flex h-10 w-full items-center justify-center border-b border-muted text-muted transition-colors hover:text-ink"
      >
        <HugeiconsIcon icon={Mail01Icon} size={20} strokeWidth={1.5} />
      </a>

      <ThemeToggle vertical />
    </div>
  );
}