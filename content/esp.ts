import { Content } from "./types";

// Source-of-truth locale. Spanish and French start as copies of this file;
// TypeScript enforces that they stay structurally in sync.
export const esp: Content = {
  nav: {
    about: "Sobre mí",
    projects: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
  },
  hero: {
    kicker: "Desarrollador Full-Stack",
    tagline: "Diseño soluciones digitales que conectan las necesidades del usuario con los objetivos del negocio. Gracias a mi experiencia en gestión de procesos de negocio, " +
      "sé cómo escribir código limpio y escalable que realmente resuelve problemas del mundo real.",
    ctaLabel: "Ver mi trabajo",
  },
  about: {
    label: "Sobre mí",
    intro: "¡Hola! Mi nombre es Santiago y disfruto descifrar y entender sistemas complejos. Mi interés por el desarrollo de software comenzó en 2020 tras tener " +
      "mucho tiempo libre en pandemia y una gran pasión por la tecnología. \n\nAdquirí una profunda experiencia mejorando procesos y sistemas de calidad tras años trabajando " +
      "para instituciones gubernamentales. Esa experiencia me enseñó a desglosar sistemas complejos y entender lo que los usuarios realmente necesitan. " +
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
        dateRange: "Abr 2026 — Presente",
        role: "Especialista en Automatización",
        companyShort: "Summitt Energy",
        companyFull: "Summitt Energy",
        description: "Creo y mantengo reportes en tiempo real diarios, mensuales y anuales usando Power Automate y Office Scripts, brindando a la supervisión resultados actualizados de retención y cobranza para la toma de decisiones, eliminando la espera de hojas de cálculo manuales. " +
          "\nAutomaticé la recolección diaria de datos del equipo de retención de clientes y cobranzas con Power Automate, reemplazando 4 horas diarias de extracción manual de datos. " +
          "\nReconstruí y configuré los scripts de llamadas de Genesys del equipo, mejorando la visualización y búsqueda de información de clientes para que los agentes encuentren la oferta de retención o método de pago correcto más rápido, reduciendo el tiempo medio de atención en un 15%. " +
          "\nMapeé los flujos de trabajo de retención y cobranza del equipo para identificar pasos manuales repetitivos, logrando mejoras como la creación y limpieza automática de la lista de marcadores para cada campaña.",
        tech: ["Power Automate", "Reportes", "Genesys", "Office Scripts"],
      },
      {
        dateRange: "Ene 2024 — Presente",
        role: "Desarrollador Full-Stack (Freelance)",
        companyShort: "Universidad Distrital",
        companyFull: "Universidad Distrital Francisco José de Caldas (Cliente)",
        description: "Desarrollo y mantenimiento de la aplicación web interna que la universidad utiliza para ejecutar programas de capacitación para más de 500 profesores, lanzando módulos de logros y reportes luego de que los profesores fundadores abandonaran cursos al no tener una forma adecuada de seguir su progreso. " +
          "\nReemplacé los reportes manuales en hojas de cálculo de Recursos Humanos con reportes de rendimiento automatizados en Python, ahorrando más de 40 horas de trabajo al mes. " +
          "\nConstruí endpoints de API en Node.js para la gestión de cursos, permitiendo a los administradores crear y actualizar cursos sin necesidad de soporte de TI. " +
          "\nRediseñé pantallas en React que el personal no técnico encontraba difíciles de usar, reduciendo las solicitudes de soporte en un 35%. " +
          "\nReescribí consultas lentas de PostgreSQL que respaldaban las páginas principales y los reportes, reduciendo los tiempos de carga de 14 a 5 segundos. " +
          "\nColaboré con Recursos Humanos para desarrollar funciones basadas en necesidades reales de capacitación, contribuyendo a un aumento del 30% en la finalización de cursos y una mejora del 25% en la satisfacción del usuario.",
        tech: ["JavaScript", "Python", "React", "PostgreSQL", "Git"],
      },
      {
        dateRange: "Sep 2023 — Mar 2024",
        role: "Analista Senior de Procesos",
        companyShort: "Ministerio de Educación",
        companyFull: "Ministerio de Educación Nacional",
        description: "Lideré el aumento del cumplimiento normativo de la Oficina Asesora Jurídica en un 15% mediante el diseño y seguimiento de planes de mejora bajo el marco nacional de gestión pública de Colombia. " +
          "\nReconstruí los indicadores de desempeño y los planes de acción correctiva de la oficina tras auditorías internas y externas, cerrando 26 hallazgos pendientes por más de 4 años. " +
          "\nEjecuté los procesos de gestión de calidad de la Oficina Asesora Jurídica en línea con la norma ISO 9001 y las normativas gubernamentales.",
        tech: ["Mejora de Procesos", "Gestión de Calidad", "Cumplimiento Normativo"],
      },
      {
        dateRange: "Jul 2021 — Sep 2023",
        role: "Analista de Procesos",
        companyShort: "Ministerio de Cultura",
        companyFull: "Ministerio de Cultura, Artes y Saberes",
        description: "Creé los lineamientos y herramientas de gestión de riesgos utilizados por todas las áreas del ministerio, dotando a los equipos de un método común para identificar riesgos y alcanzando un 100% de cobertura en documentación. " +
          "\nContribuí a elevar el puntaje de desempeño gubernamental del ministerio de 71 a 92.5 en dos años, liderando las acciones correctivas de los procesos asignados y las directrices institucionales sobre gestión de riesgos e indicadores. " +
          "\nCapacité a más de 200 funcionarios mediante sesiones presenciales y virtuales sobre gestión de riesgos, documentación de procesos e indicadores de desempeño, y formé parte del equipo interno de gestión del conocimiento, reduciendo la pérdida de información crítica institucional. " +
          "\nRediseñé el modelo operativo del ministerio en áreas donde los procesos se superponían y las responsabilidades no estaban claras, reduciendo la duplicación de esfuerzos en 16 dependencias.",
        tech: ["Gestión de Riesgos", "Indicadores de Desempeño", "Modelos Operativos"],
      },
      {
        dateRange: "Feb 2018 — Jul 2021",
        role: "Analista de Procesos",
        companyShort: "Universidad Distrital",
        companyFull: "Universidad Distrital Francisco José de Caldas",
        description: "Contribuí a elevar el puntaje de desempeño gubernamental de la universidad de 51.4 a 61 alineando la planeación institucional con su capacidad y recursos reales. " +
          "\nModelé y validé 60 procesos de negocio en BPMN para el repositorio de arquitectura empresarial de la universidad. " +
          "\nRediseñé la documentación en todo el sistema integrado de gestión de la universidad, actualizando más de 350 documentos. " +
          "\nCapacité a más de 20 equipos en gestión de riesgos y en la construcción y reporte de indicadores de desempeño, para que cada proceso pudiera medir y reportar sus propios resultados.",
        tech: ["Gestión de Procesos de Negocio", "Gestión de Riesgos", "Arquitectura Empresarial"],
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
      {
        slug: "u-belong",
        name: "U Belong - Building Our Future in AI",
        description:
          "Guía de derechos cívicos gratuita y anónima para recién llegados a Canadá. Sin cuentas, " +
          "sin rastreo, solo la información que las personas necesitan para sentirse seguras e informadas. " +
          "Ganador del 2º lugar en el hackathon Building Our Future in AI (Marzo 2026).",
        tech: ["React", "TypeScript", "Vite"],
      },
    ],
    otherProjects: [
      {
        slug: "smart-budget",
        name: "Smart Budget",
        description: "Sistema de gestión de presupuesto y gastos diseñado para ayudar a los usuarios a registrar, categorizar " +
          "y analizar sus egresos, además de establecer límites presupuestarios y visualizar resúmenes detallados.",
        tech: ["Node.js", "React", "MongoDB"],
      },
      {
        slug: "task-bot",
        name: "TaskBot",
        description: "Aplicación de chatbot de escritorio en Python que ayuda a los usuarios a gestionar tareas mediante conversaciones en lenguaje natural. " +
          "La aplicación utiliza Procesamiento de Lenguaje Natural (NLP) y Machine Learning para traducir comandos de texto cotidianos en acciones estructuradas de base de datos.",
        tech: ["Python", "PyQt6", "nltk"],
      },
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