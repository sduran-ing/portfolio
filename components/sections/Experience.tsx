"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/context/LanguageContext";
import SectionLabel from "@/components/ui/SectionLabel";
import ExperienceItem from "./ExperienceItem";
import Container from "@/components/ui/Container";

export default function Experience() {
  const { t } = useTranslations();

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
        <div className="mt-4 flex flex-col gap-8">
          {t.experience.items.map((entry) => (
            <ExperienceItem
              key={`${entry.company}-${entry.dateRange}`}
              entry={entry}
            />
          ))}
        </div>
      </motion.div>
    </Container>
    </section>
  );
}