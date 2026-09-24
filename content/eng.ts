import { Content } from "./types";

// Source-of-truth locale. Spanish and French start as copies of this file;
// TypeScript enforces that they stay structurally in sync.
export const eng: Content = {
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
  },
  hero: {
    kicker: "Full-Stack Developer",
    tagline: "I engineer digital solutions that bridge the gap between user needs and business goals. With a background in operations, I know how to write clean, scalable code that actually solves real-world problems.",
    ctaLabel: "See my work",
  },
  about: {
    label: "About",
    intro: "Hey there! My name is Santiago and I enjoy solving puzzles. My interest in software development started back in 2020 after a lot "+
         "of pandemic free time and a love for understanding things to the core. \n\nBefore moving into software engineering, I spent years analyzing and " + 
         "improving business processes for government institutions. That experience taught me how to break down complex systems and understand what users actually need. " +
         "Today, I use that same analytical mindset to build full-stack digital solutions. Whether I'm designing a REST API or crafting a frontend interface, " +
         "my goal is always the same: to translate business needs into practical software that makes people's jobs easier.",
    aboutMe:
      "Currently building the QMS Platform, a quality management system with audit workflows and gamified process tracking.",
    personalNote: "In my spare time, you can usually find me lifting at the gym, catching up on a new game, or relaxing with a great glass of wine.",
  },
  experience: {
    label: "Experience",
    items: [
      {
        dateRange: "Jan 2024 — Present",
        role: "Full-Stack Developer",
        company: "Universidad Distrital Francisco Jose de Caldas",
        description: "• Design and implement REST APIs to support course management, user administration, and reporting features.\n• Manage PostgreSQL data workflows and build accessible, responsive user interfaces.\n• Collaborate closely with HR to translate business requirements into software, boosting platform adoption by 30% and user satisfaction by 25%.",
        tech: ["Java", "Python", "React", "PostgreSQL", "Git"],
      },
      {
        dateRange: "Sep 2023 — Mar 2024",
        role: "Senior Process Analyst",
        company: "National Ministry of Education",
        description: "• Redesigned institutional management processes and performance indicators to meet rigorous audit standards.\n• Collaborated with cross-functional teams to align workflows with regulatory goals, improving policy compliance metrics by 15%.",
        tech: ["Process Improvement", "Data Analysis", "Compliance"],
      },
      {
        dateRange: "Jul 2021 — Sep 2023",
        role: "Process Analyst",
        company: "Ministry of Culture, Arts and Knowledge",
        description: "• Developed risk management tools and automated audit tracking workflows to reduce manual administrative effort.\n• Drove data-driven planning and cross-team coordination to increase a key institutional performance index from 71 to 92.5 over two years.",
        tech: ["Workflow Automation", "Risk Management", "Reporting"],
      },
    ],
  },
  projects: {
    featuredLabel: "Featured projects",
    otherLabel: "Other creations",
    liveLabel: "Live demo",
    githubLabel: "GitHub",
    featuredProjects: [
      {
        slug: "qms-platform",
        name: "QMS Platform",
        description:
          "Web application that helps organizations manage ISO 9001:2015 compliance, tracking documents and audits " +
          "through their full lifecycle. The app is designed to motivate users " +
          "with an achievements system (gamification).",
        tech: ["Next.js", "Express", "PostgreSQL"],
      },
      // {
      //   slug: "project-2",
      //   name: "[Second project name]",
      //   description:
      //     "[Placeholder description — real copy pending]",
      //   tech: ["Placeholder", "Tech", "Stack"],
      // },
    ],
    otherProjects: [
      {
        slug: "smart-budget",
        name: "Smart Budget",
        description: "Expense and Budget Management System, program designed to help users record, categorize, " +
          "and analyze their expenses while also setting budget limits and viewing summaries.",
        tech: ["Node.js", "React", "MongoDB"],
      },
      // {
      //   slug: "task-bot",
      //   name: "[Second project name]",
      //   description: "[Placeholder description — real copy pending]",
      //   tech: ["Placeholder", "Tech", "Stack"],
      // },
    ],
  },
  contact: {
    label: "Contact",
    heading: "Say hello",
    supportingLine:
      "Open to conversations about full-stack roles, quality systems, or whatever you're building next.",
    emailLabel: "Email me",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with Next.js, TypeScript, and Framer Motion. Deployed with Vercel.",
  },
};