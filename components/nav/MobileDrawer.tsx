"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  GithubIcon,
  Linkedin01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { useTranslations } from "@/context/LanguageContext";
import { SOCIAL_LINKS } from "@/lib/utils/constants";
import { sections } from "./NavLinks";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

// Stagger for the links: the <ul> is the parent, each <li> is a child, and
// Framer Motion plays the children one after another because the parent's
// "visible" variant has staggerChildren. delayChildren waits a beat so the
// links start appearing once the drawer itself is mostly in place, instead
// of fading in on top of a panel that's still sliding.
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const linkVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

// The slide-in menu for mobile: a blurred, dimmed overlay over the whole
// page plus a panel that covers 70% of the screen from the right. Closing
// it (link tapped, X tapped, or overlay tapped) all go through onClose, so
// MobileMenu stays the only place that owns the open/closed state.
// The page-freeze (scroll lock) and the Escape key live in MobileMenu too.
export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { t } = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  // Same tween in and out so the drawer leaves the way it came. A spring
  // was tempting, but it can overshoot past x: 0 and briefly open a gap
  // on the right edge, which looks like a glitch on a full-height panel.
  // For reduced motion the duration is 0, so it just appears and disappears.
  const slide = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    // AnimatePresence keeps an element mounted until its exit animation
    // finishes. It only tracks its DIRECT children, so the overlay and the
    // drawer are two separate conditionals here (not wrapped in one
    // fragment), each with its own key.
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          // This is the "tap outside to close" area. It covers the whole
          // screen, and the drawer sits on top of its right 70%, so a tap
          // that lands on the overlay is by definition outside the drawer.
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={slide}
          // backdrop-blur is what makes the page behind go blurry, and the
          // translucent surface color dims it a little so the drawer pops.
          // z-[60] sits above the header (z-40) and the floating style
          // button (z-50), so those get blurred along with everything else.
          className="fixed inset-0 z-[60] bg-surface/50 backdrop-blur-md"
          aria-hidden="true"
        />
      )}

      {open && (
        <motion.aside
          key="drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={slide}
          className="fixed inset-y-0 right-0 z-[70] flex w-[70%] flex-col border-l border-muted bg-surface px-6 py-5 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            {/* The domain is a proper noun, not translated content, same
                reasoning as the logo in NavBar being hardcoded. */}
            <span className="font-mono text-xs tracking-wider text-muted">
              sduran.dev
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="text-ink"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.5} />
            </button>
          </div>

          <motion.ul
            variants={listVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="mt-10 flex flex-col"
          >
            {sections.map((section, index) => (
              <motion.li
                key={section.id}
                variants={linkVariants}
                className="border-b border-muted/40 last:border-b-0"
              >
                {/* onClick={onClose} is the whole fix for the old "menu
                    keeps floating" problem. The anchor still does its
                    normal job (jump to #section), and this extra handler
                    additionally closes the drawer, which also lifts the
                    scroll lock in MobileMenu. */}
                <a
                  href={`#${section.id}`}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 py-5"
                >
                  {/* 01, 02, 03... same numbered-marker look as the
                      Experience bullets, so the site reads as one system. */}
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-2xl text-ink transition-colors group-active:text-accent">
                    {t.nav[section.key]}
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* mt-auto pushes this whole block to the bottom of the drawer,
              since the drawer is a full-height flex column. */}
          <div className="mt-auto flex flex-col gap-6 border-t border-muted/40 pt-6">
            {/* The same two controls the desktop header uses, rendered
                here in their normal horizontal form. They don't close the
                drawer when used, on purpose: you can flip the language and
                watch the links above change without the menu vanishing.
                flex-wrap keeps them from overflowing on very narrow
                phones - the theme toggle just drops to a second line. */}
            <div className="flex flex-wrap items-center gap-4">
              <LanguageSwitch />
              <ThemeToggle />
            </div>

            {/* Icon-only links, so each one needs an aria-label for screen
                readers. GitHub and LinkedIn open in a new tab (rel keeps
                the new page from getting access to this one); the email
                link is a mailto: so it needs neither. */}
            <div className="flex items-center gap-5 text-muted">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-ink"
              >
                <HugeiconsIcon icon={GithubIcon} size={24} strokeWidth={1.5} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-ink"
              >
                <HugeiconsIcon icon={Linkedin01Icon} size={24} strokeWidth={1.5} />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send an email"
                className="transition-colors hover:text-ink"
              >
                <HugeiconsIcon icon={Mail01Icon} size={24} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}