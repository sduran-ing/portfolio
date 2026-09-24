"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";
import { SOCIAL_LINKS } from "@/lib/utils/constants";

export default function Contact() {
  const { t } = useTranslations();

  return (
    <section id="contact" className="py-48">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          // text-center, unlike every other section - Contact is meant to
          // read as a deliberate closing full stop to the page, not a
          // continuation of the left-aligned flow above it.
          className="flex flex-col items-center text-center"
        >
          <SectionLabel>{t.contact.label}</SectionLabel>

          <h2 className="font-heading text-4xl font-semibold text-ink">
            {t.contact.heading}
          </h2>

          <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted">
            {t.contact.supportingLine}
          </p>

          {/* The one filled/solid button on the entire site. Every other
              button (Live demo, GitHub, project links) uses the outline or
              secondary variant - reserving filled for this single spot
              makes it read as "the actual ask" without needing to shout. */}
          <div className="mt-8">
            <Button href={SOCIAL_LINKS.email} variant="filled">
              {t.contact.emailLabel}
            </Button>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}