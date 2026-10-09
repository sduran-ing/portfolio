"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "@/context/LanguageContext";
import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";
import ExperienceTabList from "./ExperienceTabList";
import ExperienceItem from "./ExperienceItem";

export default function Experience() {
  const { t } = useTranslations();

  // Which company's details are showing right now. We store the index
  // into t.experience.items rather than the entry object itself, so
  // ExperienceTabList can just check "is this index the selected one"
  // instead of comparing whole objects.
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedEntry = t.experience.items[selectedIndex];

  return (
    <section id="experience" className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel>{t.experience.label}</SectionLabel>

          {/* flex-col on mobile stacks the tab row above the panel;
              sm:flex-row moves to the side-by-side desktop layout. */}
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:gap-10">
            <ExperienceTabList
              entries={t.experience.items}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />

            <div className="flex-1">
              {/* mode="wait" lets the outgoing entry finish its exit
                  animation before the new one starts fading in, so they
                  don't cross-fade on top of each other. The key tied to
                  selectedIndex is what tells AnimatePresence a swap
                  happened at all - without a changing key it wouldn't know
                  this is a new element to animate in. */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExperienceItem entry={selectedEntry} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}