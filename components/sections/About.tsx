"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/context/LanguageContext";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

export default function About() {
  const { t } = useTranslations();

  return (
    <section id="about" className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel>{t.about.label}</SectionLabel>

          {/*
            Two-column split, replacing the old single stacked column.
            The intro (with its drop cap, unchanged) stays the lead voice
            on a wider left column; the two supporting lines that used to
            just flow down the page (aboutMe, personalNote) now live
            together in their own bordered card on the right instead -
            giving the "currently building" line real visual weight of
            its own, rather than being one paragraph among several.
            flex-col by default (stacked on mobile), sm:flex-row splits
            them side by side from the sm breakpoint up.
          */}
          <div className="mt-4 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            {/*
              Drop cap on the first letter only, using Tailwind's built-in
              first-letter: variant - no custom CSS needed. float-left
              pulls the big letter out of normal text flow so the rest of
              the paragraph wraps around it, the way a print drop cap
              works. Unchanged from before - only its column width is new.
            */}
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-ink first-letter:float-left first-letter:mr-2 first-letter:font-heading first-letter:text-5xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-accent sm:w-[60%] sm:shrink-0">
              {t.about.intro}
            </p>

            {/* The supporting-facts card. Both lines used to be plain
                paragraphs stacked in the main column; now they're grouped
                into one bordered surface so they read as a distinct,
                scannable unit rather than a continuation of the intro. */}
            <div className="rounded-lg border border-muted bg-surface-elevated p-6 sm:flex-1">
              <p className="border-l-2 border-accent pl-4 text-md leading-relaxed text-ink">
                {t.about.aboutMe}
              </p>
              <p className="mt-4 text-md leading-relaxed text-muted">
                {t.about.personalNote}
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}