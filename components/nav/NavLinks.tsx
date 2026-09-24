"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/context/LanguageContext";
import { navItem } from "@/lib/utils/introMotion";

// Section ids match the id attribute on each actual <section> element on
// the page (About, Experience, Projects, Contact), so these can be plain
// anchor jumps, no client-side routing needed for a single-page site.
// "as const" on each key keeps it typed as the literal string ("about",
// not just "string"), which is what lets t.nav[section.key] below type-check
// against the Content interface instead of widening to a generic string.
const sections = [
  { id: "about", key: "about" as const },
  { id: "experience", key: "experience" as const },
  { id: "projects", key: "projects" as const },
  { id: "contact", key: "contact" as const },
];

interface NavLinksProps {
  // Lets MobileMenu render these stacked vertically instead of the
  // horizontal row, without duplicating the link markup in a second place.
  className?: string;

  // When true, each link slides down into place as part of NavBar's
  // page-load stagger sequence. Defaults to false and is only passed by
  // NavBar's own desktop render - MobileMenu's dropdown panel doesn't
  // pass this, so its links stay plain, un-animated <li> elements exactly
  // as before. That dropdown opens and closes on click, not on page
  // load, so it never needs the intro treatment in the first place.
  animated?: boolean;
}


export default function NavLinks({
  className = "flex items-center gap-6",
  animated = false,
}: NavLinksProps) {
  const { t } = useTranslations();

  return (
    <ul className={className}>
      {sections.map((section) =>
        animated ? (
          <motion.li key={section.id} variants={navItem}>
            <a
              href={`#${section.id}`}
              className="text-md font-medium font-mono text-ink hover:text-accent transition-colors"
            >
              {t.nav[section.key]}
            </a>
          </motion.li>
        ) : (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-md font-medium font-mono text-ink hover:text-accent transition-colors"
            >
              {t.nav[section.key]}
            </a>
          </li>
        )
      )}
    </ul>
  );
}