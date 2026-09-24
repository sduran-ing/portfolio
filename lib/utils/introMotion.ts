import type { Variants } from "framer-motion";

// Shared entrance choreography for the page's first-load sequence:
// 1. Nav (logo, links, toggles) slides down into place, staggered.
// 2. Hero's own entrance starts once the nav has finished.
// 3. SocialSidebar and the mobile menu trigger fade in last.
// Centralizing the timing numbers here, instead of scattering them
// across NavBar, Hero, SocialSidebar, and page.tsx separately, is what
// keeps the handoff points between phases easy to retune later without
// hunting through multiple files for magic numbers that all have to
// agree with each other.

// --- Phase 1: nav ---

const NAV_ITEM_DURATION = 0.4;
const NAV_STAGGER_GAP = 0.08;
const NAV_ITEM_COUNT = 7; // logo, 4 links, language switch, theme toggle

// The moment (in seconds after page load) the nav's own stagger
// sequence finishes - Hero's entrance uses this as its own start delay.
export const HERO_START_DELAY = (NAV_ITEM_COUNT - 1) * NAV_STAGGER_GAP + NAV_ITEM_DURATION;

export const navContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: NAV_STAGGER_GAP },
  },
};

export const navItem: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: NAV_ITEM_DURATION, ease: "easeOut" } },
};

// --- Phase 2: hero ---
// Hero's own container/item variants live in Hero.tsx itself, not here -
// they're specific to Hero's own visual treatment, not shared the way
// navItem is shared between NavBar and NavLinks. These two numbers are
// mirrors of what's set in Hero.tsx's own container variant, needed here
// only to calculate when phase 3 should start. If Hero's own stagger gap
// or item count ever changes, these two need updating to match, or
// phase 3 will start at the wrong moment relative to Hero finishing.

const HERO_STAGGER_GAP = 0.15;
const HERO_ITEM_DURATION = 0.5;
const HERO_ITEM_COUNT = 4; // kicker, name, tagline, CTA row

const HERO_TOTAL_DURATION = (HERO_ITEM_COUNT - 1) * HERO_STAGGER_GAP + HERO_ITEM_DURATION;

// --- Phase 3: social sidebar + mobile menu trigger ---

export const PHASE_3_START_DELAY = HERO_START_DELAY + HERO_TOTAL_DURATION;

// Opacity-only, deliberately no slide or scale. Both SocialSidebar and
// the mobile menu trigger sit inside, or control, position:fixed
// elements, and animating x/y/scale adds a CSS transform to whatever
// element it's applied to - a transformed ANCESTOR becomes the
// positioning reference for any position:fixed descendant instead of the
// real viewport, which is the exact bug that broke MobileMenu's panels
// once already. A pure opacity fade never adds a transform, so it can't
// reintroduce that bug.
export const phase3Item: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: PHASE_3_START_DELAY },
  },
};