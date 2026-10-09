"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/context/LanguageContext";
import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";
import FeaturedProject from "./FeaturedProject";
import ProjectCard from "./ProjectCard";
import { PROJECT_LINKS } from "@/lib/utils/constants";

export default function Projects() {
  const { t } = useTranslations();

  return (
    <section id="projects" className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel>{t.projects.featuredLabel}</SectionLabel>

          <div className="mt-4 mb-16 flex flex-col gap-16">
            {/* index is the second argument .map() gives the callback. Even indexes
      (0, 2, 4...) keep the image on the left, odd ones (1, 3, 5...) flip it
      to the right, so the projects alternate down the page. */}
            {t.projects.featuredProjects.map((project, index) => {
              const links = PROJECT_LINKS[project.slug];
              return (
                <FeaturedProject
                  key={project.slug}
                  name={project.name}
                  description={project.description}
                  tech={project.tech}
                  liveLabel={t.projects.liveLabel}
                  githubLabel={t.projects.githubLabel}
                  liveUrl={links?.liveUrl ?? "#"}
                  githubUrl={links?.githubUrl ?? "#"}
                  imageUrl={links?.imageUrl}
                  reverse={index % 2 === 1}
                />
              );
            })}
          </div>

          <SectionLabel>{t.projects.otherLabel}</SectionLabel>

          {t.projects.otherProjects.length > 0 && (
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {t.projects.otherProjects.map((project) => {
                const links = PROJECT_LINKS[project.slug];
                return (
                  <ProjectCard
                    key={project.slug}
                    name={project.name}
                    description={project.description}
                    tech={project.tech}
                    liveLabel={t.projects.liveLabel}
                    githubLabel={t.projects.githubLabel}
                    liveUrl={links?.liveUrl}
                    githubUrl={links?.githubUrl ?? "#"}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}