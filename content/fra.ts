import { Content } from "./types";

export const fra: Content = {
  nav: {
    about: "À propos",
    experience: "Expérience",
    projects: "Projets",
    contact: "Contact",
  },
  hero: {
    kicker: "Développeur Full-Stack",
    tagline: "Je conçois des solutions numériques qui font le pont entre les besoins des utilisateurs et les objectifs commerciaux. Fort de mon expérience en opérations, je sais écrire un code propre et évolutif qui résout de véritables problèmes concrets.",
    ctaLabel: "Voir mon travail",
  },
  about: {
    label: "À propos",
    intro: "Salut ! Je m'appelle Santiago et j'adore résoudre des problèmes complexes. Mon intérêt pour le développement logiciel a commencé en 2020 après avoir eu " +
         "beaucoup de temps libre pendant la pandémie et une passion pour comprendre les choses en profondeur. \n\nAvant de me réorienter vers l'ingénierie logicielle, j'ai passé des années à analyser et " + 
         "améliorer les processus métiers pour des institutions gouvernementales. Cette expérience m'a appris à décortiquer des systèmes complexes et à comprendre ce dont les utilisateurs ont réellement besoin. " +
         "Aujourd'hui, j'utilise ce même esprit analytique pour créer des solutions numériques full-stack. Que je conçoive une API REST ou que je développe une interface utilisateur, " +
         "mon objectif reste le même : transformer les besoins commerciaux en logiciels pratiques qui facilitent le travail des gens.",
    aboutMe:
      "Je développe actuellement la plateforme QMS, un système de gestion de la qualité intégrant des flux d'audit et un suivi des processus ludifié (gamification).",
    personalNote: "Pendant mon temps libre, vous me trouverez généralement en train de soulever de la fonte à la salle de sport, de découvrir un nouveau jeu vidéo ou de me détendre avec un bon verre de vin.",
  },
  experience: {
    label: "Expérience",
    items: [
      {
        dateRange: "Janv. 2024 — Présent",
        role: "Développeur Full-Stack",
        company: "Universidad Distrital Francisco Jose de Caldas",
        description: "• Conception et implémentation d'APIs REST pour soutenir la gestion des cours, l'administration des utilisateurs et les fonctionnalités de reporting.\n• Gestion des flux de données PostgreSQL et création d'interfaces utilisateur accessibles et responsives.\n• Étroite collaboration avec les RH pour traduire les besoins commerciaux en logiciels, augmentant l'adoption de la plateforme de 30 % et la satisfaction des utilisateurs de 25 %.",
        tech: ["Java", "Python", "React", "PostgreSQL", "Git"],
      },
      {
        dateRange: "Sept. 2023 — Mars 2024",
        role: "Analyste de Processus Senior",
        company: "Ministère de l'Éducation Nationale",
        description: "• Refonte des processus de gestion institutionnelle et des indicateurs de performance pour répondre à des normes d'audit rigoureuses.\n• Collaboration avec des équipes transversales pour aligner les flux de travail sur les objectifs réglementaires, améliorant les indicateurs de conformité de 15 %.",
        tech: ["Amélioration des Processus", "Analyse de Données", "Conformité"],
      },
      {
        dateRange: "Juil. 2021 — Sept. 2023",
        role: "Analyste de Processus",
        company: "Ministère de la Culture, des Arts et des Savoirs",
        description: "• Développement d'outils de gestion des risques et automatisation des flux de suivi des audits pour réduire les efforts administratifs manuels.\n• Pilotage d'une planification basée sur les données et coordination inter-équipes permettant de faire passer un indice clé de performance institutionnelle de 71 à 92,5 en deux ans.",
        tech: ["Automatisation des Flux de Travail", "Gestion des Risques", "Reporting"],
      },
    ],
  },
  projects: {
    featuredLabel: "Projets en vedette",
    otherLabel: "Autres créations",
    liveLabel: "Voir la démo",
    githubLabel: "GitHub",
    featuredProjects: [
      {
        slug: "qms-platform",
        name: "QMS Platform",
        description:
          "Application web qui aide les organisations à gérer leur conformité à la norme ISO 9001:2015, en suivant les documents et les audits " +
          "tout au long de leur cycle de vie. L'application est conçue pour motiver les utilisateurs " +
          "grâce à un système d'accomplissements (gamification).",
        tech: ["Next.js", "Express", "PostgreSQL"],
      },
      // {
      //   slug: "project-2",
      //   name: "[Nom du deuxième projet]",
      //   description:
      //     "[Description provisoire — texte final en attente]",
      //   tech: ["Technologie", "Stack", "Exemple"],
      // },
    ],
    otherProjects: [
      {
        slug: "smart-budget",
        name: "Smart Budget",
        description: "Système de gestion de budget et de dépenses, conçu pour aider les utilisateurs à enregistrer, catégoriser " +
          "et analyser leurs dépenses, tout en définissant des limites budgétaires et en consultant des résumés détaillés.",
        tech: ["Node.js", "React", "MongoDB"],
      },
      // {
      //   slug: "task-bot",
      //   name: "[Nom du deuxième projet]",
      //   description: "[Description provisoire — texte final en attente]",
      //   tech: ["Technologie", "Stack", "Exemple"],
      // },
    ],
  },
  contact: {
    label: "Contact",
    heading: "Discutons",
    supportingLine:
      "Ouvert aux discussions concernant des postes full-stack, des systèmes de qualité, ou votre prochain grand projet.",
    emailLabel: "Envoyez-moi un e-mail",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },
  footer: {
    rights: "Tous droits réservés.",
    builtWith: "Conçu avec Next.js, TypeScript et Framer Motion. Déployé sur Vercel.",
  },
};