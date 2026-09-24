import { Content } from "./types";

export const esp: Content = {
  nav: {
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    contact: "Contacto",
  },
  hero: {
    kicker: "Desarrollador Full-Stack",
    tagline: "Diseño soluciones digitales que conectan las necesidades del usuario con los objetivos del negocio. Gracias a mi experiencia en operaciones, sé cómo escribir código limpio y escalable que realmente resuelve problemas del mundo real.",
    ctaLabel: "Ver mi trabajo",
  },
  about: {
    label: "Sobre mí",
    intro: "¡Hola! Mi nombre es Santiago y me apasiona resolver problemas complejos. Mi interés por el desarrollo de software comenzó en 2020 tras tener " +
         "mucho tiempo libre en pandemia y una gran curiosidad por entender cómo funcionan las cosas a fondo. \n\nAntes de adentrarme en la ingeniería de software, pasé años analizando y " + 
         "mejorando procesos de negocio para instituciones gubernamentales. Esa experiencia me enseñó a desglosar sistemas complejos y entender lo que los usuarios realmente necesitan. " +
         "Hoy en día, utilizo esa misma mentalidad analítica para crear soluciones digitales full-stack. Ya sea diseñando una API REST o creando interfaces de usuario, " +
         "mi objetivo siempre es el mismo: transformar las necesidades del negocio en software práctico que facilite el trabajo de las personas.",
    aboutMe:
      "Actualmente desarrollando QMS Platform, un sistema de gestión de calidad con flujos de auditoría y seguimiento de procesos gamificado.",
    personalNote: "En mi tiempo libre, normalmente me encontrarás levantando pesas en el gimnasio, probando algún videojuego nuevo, o relajándome con una buena copa de vino.",
  },
  experience: {
    label: "Experiencia",
    items: [
      {
        dateRange: "Ene 2024 — Presente",
        role: "Desarrollador Full-Stack",
        company: "Universidad Distrital Francisco José de Caldas",
        description: "• Diseño e implementación de APIs REST para respaldar la gestión de cursos, administración de usuarios y funciones de reportería.\n• Gestión de flujos de datos en PostgreSQL y desarrollo de interfaces de usuario accesibles y responsivas.\n• Colaboración estrecha con Recursos Humanos para traducir requisitos del negocio en software, incrementando la adopción de la plataforma en un 30% y la satisfacción del usuario en un 25%.",
        tech: ["Java", "Python", "React", "PostgreSQL", "Git"],
      },
      {
        dateRange: "Sep 2023 — Mar 2024",
        role: "Analista Senior de Procesos",
        company: "Ministerio de Educación Nacional",
        description: "• Rediseño de procesos de gestión institucional e indicadores de rendimiento para cumplir con rigurosos estándares de auditoría.\n• Colaboración con equipos multidisciplinarios para alinear los flujos de trabajo con los objetivos regulatorios, mejorando las métricas de cumplimiento de políticas en un 15%.",
        tech: ["Mejora de Procesos", "Análisis de Datos", "Cumplimiento Regulatorio"],
      },
      {
        dateRange: "Jul 2021 — Sep 2023",
        role: "Analista de Procesos",
        company: "Ministerio de Cultura, Artes y Saberes",
        description: "• Desarrollo de herramientas para la gestión de riesgos y automatización de flujos de seguimiento de auditorías, reduciendo el esfuerzo administrativo manual.\n• Liderazgo en la planificación basada en datos y coordinación entre equipos para incrementar un índice clave de desempeño institucional de 71 a 92.5 en dos años.",
        tech: ["Automatización de Flujos de Trabajo", "Gestión de Riesgos", "Reportería"],
      },
    ],
  },
  projects: {
    featuredLabel: "Proyectos destacados",
    otherLabel: "Otras creaciones",
    liveLabel: "Ver demo",
    githubLabel: "GitHub",
    featuredProjects: [
      {
        slug: "qms-platform",
        name: "QMS Platform",
        description:
          "Aplicación web que ayuda a las organizaciones a gestionar el cumplimiento de la norma ISO 9001:2015, realizando el seguimiento de documentos y auditorías " +
          "durante todo su ciclo de vida. La aplicación está diseñada para motivar a los usuarios " +
          "mediante un sistema de logros (gamificación).",
        tech: ["Next.js", "Express", "PostgreSQL"],
      },
      // {
      //   slug: "project-2",
      //   name: "[Nombre del segundo proyecto]",
      //   description:
      //     "[Descripción provisional — texto real pendiente]",
      //   tech: ["Tecnología", "Stack", "Ejemplo"],
      // },
    ],
    otherProjects: [
      {
        slug: "smart-budget",
        name: "Smart Budget",
        description: "Sistema de gestión de presupuesto y gastos diseñado para ayudar a los usuarios a registrar, categorizar " +
          "y analizar sus egresos, además de establecer límites presupuestarios y visualizar resúmenes detallados.",
        tech: ["Node.js", "React", "MongoDB"],
      },
      // {
      //   slug: "task-bot",
      //   name: "[Nombre del segundo proyecto]",
      //   description: "[Descripción provisional — texto real pendiente]",
      //   tech: ["Tecnología", "Stack", "Ejemplo"],
      // },
    ],
  },
  contact: {
    label: "Contacto",
    heading: "¡Hablemos!",
    supportingLine:
      "Abierto a conversar sobre roles full-stack, automatización de procesos o sobre tu próximo gran proyecto.",
    emailLabel: "Envíame un correo",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    builtWith: "Construido con Next.js, TypeScript y Framer Motion. Desplegado en Vercel.",
  },
};