"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Linkedin01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { SOCIAL_LINKS } from "@/lib/utils/constants";
import { phase3Item } from "@/lib/utils/introMotion";

const icons = [
  { icon: GithubIcon, href: SOCIAL_LINKS.github, label: "GitHub" },
  { icon: Linkedin01Icon, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: Mail01Icon, href: SOCIAL_LINKS.email, label: "Email" },
];

// Shared hover-lift link style, used by both the desktop fixed column and
// the mobile inline row below - one definition instead of two copies that
// could quietly drift apart from each other later.
//
// hover:-translate-y-1 is the "elevation" lift - a small upward shift, not
// a scale or shadow change. transition-colors alone wouldn't animate a
// transform, so this needs transition-all instead.
function SocialLinks() {
  return (
    <>
      {icons.map(({ icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-ink transition-all duration-200 hover:-translate-y-1 hover:text-accent"
        >
          <HugeiconsIcon icon={icon} size={25} strokeWidth={1.5} />
        </a>
      ))}
    </>
  );
}

interface SocialSidebarProps {
  inline?: boolean;
}

export default function SocialSidebar({ inline = false }: SocialSidebarProps) {
  // Only used by the desktop branch below - the inline mobile row sits
  // far down the page near Contact, well past the point the page-load
  // intro sequence has already finished, so it has no reason to
  // participate in it.
  const shouldReduceMotion = useReducedMotion();

  if (inline) {
    return (
      <div className="flex items-center justify-center gap-6 py-8 md:hidden">
        <SocialLinks />
      </div>
    );
  }

  return (
    // Phase 3 of the page's entrance sequence (lib/utils/introMotion.ts)
    // - fades in once Hero has finished, alongside the mobile menu
    // trigger. Applied directly to this element (the actual fixed one),
    // not to an extra wrapper div around it: wrapping it would risk a
    // transform landing on an ancestor of this fixed element, which
    // breaks position:fixed's positioning - the exact bug that hit
    // MobileMenu once already. phase3Item only ever animates opacity,
    // never a transform, which is what keeps applying it directly here
    // safe.
    <motion.div
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate="visible"
      variants={phase3Item}
      className="fixed bottom-0 left-12 z-30 hidden flex-col items-center gap-10 pb-6 md:flex"
    >
      <SocialLinks />
      {/* h-40 attribute controls how long is the vertical line*/}
      <div className="h-40 w-px bg-muted" aria-hidden="true" />
    </motion.div>
  );
}