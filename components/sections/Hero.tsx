"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Linkedin01Icon } from "@hugeicons/core-free-icons";
import { useTranslations } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";
import IconLink from "@/components/ui/IconLink";
import Container from "@/components/ui/Container";
import { SOCIAL_LINKS } from "@/lib/utils/constants";
import { HERO_START_DELAY } from "@/lib/utils/introMotion";

// Staggered entrance: each child below (kicker, name, tagline, CTA row)
// fades and slides up a beat after the one before it. staggerChildren
// handles the timing gap between them automatically, rather than four
// separate hand-tuned animation delays.
//
// Explicitly typed as Variants (not inferred) so TypeScript checks
// `ease: "easeOut"` against Framer's real Easing type from the start -
// otherwise it widens to a plain string and fails to type-check later.
const container: Variants = {
  hidden: {},
  visible: {
    // delayChildren holds off the FIRST child's animation until
    // HERO_START_DELAY seconds have passed - staggerChildren still
    // controls the gap between each child after that point.
    // Without this, Hero's entrance would start playing immediately on
    // mount, at the same time as NavBar's, instead of picking up right
    // as NavBar's own sequence finishes.
    transition: { staggerChildren: 0.15, delayChildren: HERO_START_DELAY },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const { t } = useTranslations();

  // Framer Motion's own hook for the same prefers-reduced-motion check
  // ThemeToggle does manually with matchMedia - built in here since Framer
  // already tracks it internally for its own animations.
  const shouldReduceMotion = useReducedMotion();

  return (
    // id="top" is what NavBar's name link scrolls back to.
    <section
      id="top"
      className="flex min-h-screen flex-col justify-center"
      style={{ paddingTop: "var(--nav-height)" }}
    >
      <Container>
        <motion.div
          // Skips straight to the finished state when reduced motion is
          // requested, instead of animating through it (and instead of
          // waiting through HERO_START_DELAY for nothing).
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          variants={container}
        >
          <motion.p variants={item} className="font-mono text-lg text-accent">
            {t.hero.kicker}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 font-heading text-5xl font-semibold text-ink sm:text-6xl"
          >
            Santiago Duran
          </motion.h1>

          <motion.p variants={item} className="mt-4 max-w-xl text-2xl text-muted">
            {t.hero.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex items-center gap-6">
            <Button href="#projects" variant="outline">
              {t.hero.ctaLabel}
            </Button>
            <div className="flex items-center gap-4">
              <IconLink href={SOCIAL_LINKS.github} icon={GithubIcon} label="GitHub" />
              <IconLink href={SOCIAL_LINKS.linkedin} icon={Linkedin01Icon} label="LinkedIn" />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}