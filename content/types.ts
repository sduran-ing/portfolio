// Contract every locale file must satisfy. Add a field here when a section
// needs new text, TypeScript will then flag every locale file that hasn't
// been updated to match.

export interface ExperienceEntry {
  dateRange: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

// Shared shape for both featuredProjects and otherProjects - the two
// arrays hold the same kind of data, just rendered by different
// components (FeaturedProject vs the smaller ProjectCard grid).
// slug pairs each entry with its non-translatable URLs in lib/projects.ts.
export interface ProjectEntry {
  slug: string;
  name: string;
  description: string;
  tech: string[];
}

export interface Content {
  nav: {
    about: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    kicker: string;
    tagline: string;
    ctaLabel: string;
  };
  about: {
    label: string;
    intro: string;
    aboutMe: string;
    personalNote: string;
  };
  experience: {
    label: string;
    items: ExperienceEntry[];
  };
  projects: {
  featuredLabel: string;
  otherLabel: string;
  liveLabel: string;
  githubLabel: string;
  featuredProjects: ProjectEntry[];
  otherProjects: ProjectEntry[];
};
  contact: {
    label: string;
    heading: string;
    supportingLine: string;
    emailLabel: string;
    githubLabel: string;
    linkedinLabel: string;
  };
footer: {
  rights: string;
  builtWith: string;
};
}