import { Content } from "./types";

// Source-of-truth locale. Spanish and French start as copies of this file;
// TypeScript enforces that they stay structurally in sync.
export const fra: Content = {
  nav: {
    about: "À propos",
    projects: "Projets",
    experience: "Expérience",
    contact: "Contact",
  },
  hero: {
    kicker: "Développeur Full-Stack",
    tagline: "Je conçois des solutions numériques qui font le pont entre les besoins des utilisateurs et les objectifs commerciaux. Fort de mon expérience en gestion des processus métiers, " +
      "je sais écrire un code propre et évolutif qui résout de véritables problèmes concrets.",
    ctaLabel: "Voir mon travail",
  },
  about: {
    label: "À propos",
    intro: "Salut ! Je m'appelle Santiago et j'aime déchiffrer et comprendre les systèmes complexes. Mon intérêt pour le développement logiciel a commencé en 2020, après avoir eu " +
      "beaucoup de temps libre pendant la pandémie et une véritable passion pour la technologie. \n\nJ'ai acquis une solide expérience dans l'amélioration des processus et des systèmes de qualité après des années passées à travailler " +
      "pour des institutions gouvernementales. Cette expérience m'a appris à décortiquer des systèmes complexes et à comprendre ce dont les utilisateurs ont réellement besoin. " +
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
        dateRange: "Avr. 2026 — Présent",
        role: "Spécialiste en Automatisation",
        companyShort: "Summitt Energy",
        companyFull: "Summitt Energy",
        description: "Création et maintenance de rapports en temps réel (quotidiens, mensuels et annuels) à l'aide de Power Automate et Office Scripts, fournissant à la supervision des résultats de rétention et de recouvrement à jour pour des prises de décision qui dépendaient auparavant de tableurs manuels. " +
          "\nAutomatisation de la collecte quotidienne de données pour l'équipe de rétention et de recouvrement avec Power Automate, remplaçant ainsi 4 heures d'extraction manuelle de données par jour. " +
          "\nRefonte et configuration des scripts d'appels Genesys de l'équipe, améliorant l'affichage et la recherche d'informations clients pour permettre aux agents de trouver plus rapidement l'offre de rétention ou l'option de paiement adéquate, réduisant le temps moyen de traitement de 15 %. " +
          "\nCartographie des flux de rétention et de recouvrement de l'équipe afin d'identifier les tâches manuelles répétitives, conduisant à des améliorations telles que la création et le nettoyage automatiques de la liste d'appels pour chaque campagne.",
        tech: ["Power Automate", "Rapports", "Genesys", "Office Scripts"],
      },
      {
        dateRange: "Janv. 2024 — Présent",
        role: "Développeur Full-Stack (Freelance)",
        companyShort: "Universidad Distrital",
        companyFull: "Universidad Distrital Francisco Jose de Caldas (Client)",
        description: "Développement et maintenance de l'application web interne utilisée par l'université pour gérer les programmes de formation de plus de 500 enseignants. Lancement des modules de réussites et de rapports après que des professeurs fondateurs aient abandonné des cours faute de moyen pour suivre leurs progrès. " +
          "\nRemplacement des rapports manuels sur tableur des Ressources Humaines par des rapports de performance automatisés en Python, permettant d'économiser plus de 40 heures de travail par mois. " +
          "\nCréation de endpoints d'API en Node.js pour la gestion des cours, permettant aux administrateurs de créer et mettre à jour des cours sans l'aide du support informatique. " +
          "\nRefonte des interfaces en React jugées difficiles d'utilisation par le personnel non technique, réduisant les demandes de support de 35 %. " +
          "\nRéécriture de requêtes PostgreSQL lentes utilisées par les pages principales et les rapports, réduisant les temps de chargement de 14 à 5 secondes. " +
          "\nPartenariat avec les Ressources Humaines pour développer des fonctionnalités basées sur de véritables besoins de formation, contribuant à une hausse de 30 % du taux d'achèvement et à une amélioration de 25 % de la satisfaction des utilisateurs.",
        tech: ["JavaScript", "Python", "React", "PostgreSQL", "Git"],
      },
      {
        dateRange: "Sept. 2023 — Mars 2024",
        role: "Analyste de Processus Senior",
        companyShort: "Ministère de l'Éducation",
        companyFull: "Ministère de l'Éducation Nationale",
        description: "Pilotage d'une augmentation de 15 % de la conformité réglementaire du Bureau Juridique par la conception et le suivi de plans d'amélioration dans le cadre de la gestion publique nationale de la Colombie. " +
          "\nRefonte des indicateurs de performance et des plans d'actions correctives du bureau suite à des audits internes et externes, permettant de clôturer 26 anomalies en attente depuis plus de 4 ans. " +
          "\nGestion des processus de qualité du Bureau Juridique conformément à la norme ISO 9001 et aux réglementations gouvernementales.",
        tech: ["Amélioration des Processus", "Gestion de la Qualité", "Conformité"],
      },
      {
        dateRange: "Juil. 2021 — Sept. 2023",
        role: "Analyste de Processus",
        companyShort: "Ministère de la Culture",
        companyFull: "Ministère de la Culture, des Arts et des Savoirs",
        description: "Création des directives et outils de gestion des risques utilisés par l'ensemble des services du ministère, offrant aux équipes une méthode commune pour identifier les risques et atteignant une couverture documentaire de 100 %. " +
          "\nContribution à l'augmentation du score de performance gouvernementale du ministère de 71 à 92,5 en deux ans, en pilotant les actions correctives pour les processus assignés ainsi que les directives à l'échelle de l'organisation sur la gestion des risques et des indicateurs. " +
          "\nFormation de plus de 200 employés via des sessions en présentiel et virtuelles sur la gestion des risques, la documentation des processus et les indicateurs de performance, et participation à l'équipe interne de gestion des connaissances du ministère, réduisant la perte de savoir institutionnel critique. " +
          "\nRefonte du modèle opérationnel du ministère là où les processus se chevauchaient et où les responsabilités n'étaient pas claires, réduisant ainsi les doublons à travers 16 départements.",
        tech: ["Gestion des Risques", "Indicateurs de Performance", "Modèles Opérationnels"],
      },
      {
        dateRange: "Févr. 2018 — Juil. 2021",
        role: "Analyste de Processus",
        companyShort: "Universidad Distrital",
        companyFull: "Universidad Distrital Francisco Jose de Caldas",
        description: "Contribution à l'augmentation du score de performance gouvernementale de l'université de 51,4 à 61 en alignant la planification institutionnelle sur ses capacités et ressources réelles. " +
          "\nModélisation et validation de 60 processus métiers en BPMN pour le référentiel d'architecture d'entreprise de l'université. " +
          "\nRefonte de la documentation à travers le système de gestion intégré de l'université, avec la mise à jour de plus de 350 documents. " +
          "\nFormation de plus de 20 équipes à la gestion des risques ainsi qu'à la création et au reporting d'indicateurs de performance, afin que chaque processus puisse suivre et rapporter ses propres résultats.",
        tech: ["Gestion des Processus Métiers", "Gestion des Risques", "Architecture d'Entreprise"],
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
      {
        slug: "u-belong",
        name: "U Belong - Building Our Future in AI",
        description:
          "Guide des droits civiques gratuit et anonyme pour les nouveaux arrivants au Canada. Pas de compte, " +
          "pas de traçage, juste les informations dont les gens ont besoin pour se sentir en sécurité et informés. " +
          "A remporté la 2ème place au hackathon Building Our Future in AI (Mars 2026).",
        tech: ["React", "TypeScript", "Vite"],
      },
    ],
    otherProjects: [
      {
        slug: "smart-budget",
        name: "Smart Budget",
        description: "Système de gestion de budget et de dépenses, conçu pour aider les utilisateurs à enregistrer, catégoriser " +
          "et analyser leurs dépenses, tout en définissant des limites budgétaires et en consultant des résumés détaillés.",
        tech: ["Node.js", "React", "MongoDB"],
      },
      {
        slug: "task-bot",
        name: "TaskBot",
        description: "Application de chatbot de bureau en Python qui aide les utilisateurs à gérer leurs tâches via des conversations en langage naturel. " +
          "L'application utilise le traitement du langage naturel (NLP) et le Machine Learning pour traduire des commandes textuelles quotidiennes en actions de base de données structurées.",
        tech: ["Python", "PyQt6", "nltk"],
      },
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