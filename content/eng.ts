import { Content } from "./types";

// Source-of-truth locale. Spanish and French start as copies of this file;
// TypeScript enforces that they stay structurally in sync.
export const eng: Content = {
  nav: {
    about: "About",    
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  },
  hero: {
    kicker: "Full-Stack Developer",
    tagline: "I engineer digital solutions that bridge the gap between user needs and business goals. With a background in business process management, " +
    "I know how to write clean, scalable code that actually solves real-world problems.",
    ctaLabel: "See my work",
  },
  about: {
    label: "About",
    intro: "Hey there! My name is Santiago and I enjoy deciphering and understanding complex systems. My interest in software development started back in 2020 after a lot "+
         "of pandemic free time and a love for technology. \n\nI gathered deep experience improving processes and quality systems, after years working " + 
         "for government institutions. That experience taught me how to break down complex systems and understand what users actually need. " +
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
        dateRange: "Apr 2026 — Present",
        role: "Automation Specialist",
        companyShort: "Summitt Energy",
        companyFull: "Summitt Energy",
        description: "Create and maintain live daily, monthly, and yearly reports with Power Automate and Office Scripts, giving the supervisor up-to-date retention and collections results for decisions that previously waited on manual spreadsheets. " +
        "\nAutomated the daily data gathering of the customer retention and collections team with Power Automate, replacing 4 hours of manual data pulls each day." +
        "\nRebuilt and configured the team's Genesys call scripts, improving the display and search of customers info so agents reach the right retention offer or payment option faster, reducing average handle time by 15%. " +
        "\nMapped the team's retention and collections workflows to find repetitive manual steps, leading to improvements such as the automatic creation and cleaning of the dialers list for each campaign.",
        tech: ["Power Automate", "Reports", "Genesys", "Office Scripts"],
      },
      {
        dateRange: "Jan 2024 — Present",
        role: "Full-Stack Developer (Freelance)",
        companyShort: "Universidad Distrital",
        companyFull: "Universidad Distrital Francisco Jose de Caldas (Client)",
        description: "Develop and maintain the internal web application the university uses to run training programs for 500+ teachers, shipping achievements and reports modules after founding teachers were dropping courses and had no proper way to track their progress. " +
        "\nReplaced Human Resources' manual spreadsheet reporting with automated performance reports in Python, saving more than 40 hours of work per month. " +
        "\nBuilt course management API endpoints in Node.js, letting administrators create and update courses without IT support. " +
        "\nRedesigned React screens that non-technical staff found hard to use, reducing support requests by 35%. " +
        "\nRewrote slow PostgreSQL queries behind the main pages and reports, cutting load times from 14 to 5 seconds. " +
        "\nPartnered with Human Resources to build features around real training needs, contributing to a 30% rise in training completion and a 25% improvement in user satisfaction.",
        tech: ["JavaScript", "Python", "React", "PostgreSQL", "Git"],
      },
      {
        dateRange: "Sep 2023 — Mar 2024",
        role: "Senior Process Analyst",
        companyShort: "Ministry of Education",
        companyFull: "National Ministry of Education",
        description: "Led the increase of the Legal Office's policy compliance by 15% by designing and tracking improvement plans under Colombia's national public management framework. " +
        "\nRebuilt the office's performance indicators and corrective action plans after internal and external audits, closing 26 findings pending for over 4 years. " +
        "\nRan the Legal Office's quality management processes in line with ISO 9001 and government regulations.",
        tech: ["Process Improvement", "Quality Management", "Compliance"],
      },
      {
        dateRange: "Jul 2021 — Sep 2023",
        role: "Process Analyst",
        companyShort: "Ministry of Culture",
        companyFull: "Ministry of Culture, Arts and Knowledge",
        description: "Created the risk management guidelines and tools used by every area of the ministry, giving all teams a common method for identifying risks and reaching 100% documentation coverage. " +
        "\nHelped raise the ministry's government performance score from 71 to 92.5 in two years, owning the corrective actions for assigned processes and the organization-wide guidelines on risk and indicators management. " +
        "\nTrained 200+ staff through live and virtual sessions on risk management, process documentation, and performance indicators, and served on the ministry's internal knowledge management team, reducing the loss of critical institutional knowledge. " +
        "\nRedesigned the ministry's operating model where processes overlapped and ownership was unclear, reducing duplication across 16 departments.",
        tech: ["Risk Management", "Performance Indicators", "Operating Models"],
      },
      {
        dateRange: "Feb 2018 - Jul 2021",
        role: "Process Analyst",
        companyShort: "Universidad Distrital",
        companyFull: "Universidad Distrital Francisco Jose de Caldas",
        description: "Helped raise the university's government performance score from 51.4 to 61 by aligning institutional planning with its real capacity and resources. " +
        "\nModeled and validated 60 business processes in BPMN for the university's enterprise architecture repository. " +
        "\nRedesigned documentation across the university's integrated management system, updating 350+ documents. " +
        "\nTrained 20+ teams on risk management and on building and reporting performance indicators, so each process could track and report its own results.",
        tech: ["Business Process Management", "Risk Management", "Enterprise Architecture "],
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
      {
        slug: "u-belong",
        name: "U Belong - Building Our Future in AI",
        description:
          "Free, anonymous civic rights guide for newcomers in Canada. No accounts, " +
          "no tracking, just the information people need to feel safe and informed. " +
          "Won 2nd place at the Building Our Future in AI hackathon (March 2026).",
        tech: ["React", "TypeScript", "Vite"],
      },
    ],
    otherProjects: [
      {
        slug: "smart-budget",
        name: "Smart Budget",
        description: "Expense and Budget Management System, program designed to help users record, categorize, " +
          "and analyze their expenses while also setting budget limits and viewing summaries.",
        tech: ["Node.js", "React", "MongoDB"],
      },
      {
        slug: "task-bot",
        name: "TaskBot",
        description: "Python desktop chatbot application that helps users manage tasks through natural language conversation. " +
        "The app uses Natural Language Processing (NLP) and Machine Learning to translate everyday text commands into structured database actions.",
        tech: ["Python", "PyQt6", "nltk"],
      },
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