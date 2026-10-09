// Central place for site-wide constants reused across multiple sections -
// Hero and Contact both link to the same GitHub, LinkedIn, and email.
// Placeholder values below; replace with the real ones before launch.
export const SOCIAL_LINKS = {
  github: "https://github.com/sduran-ing",
  linkedin: "https://www.linkedin.com/in/santiago-duran13/",
  email: "mailto:sduran.ing@gmail.com",
};


// Non-translatable per-project data - a URL doesn't change between
// languages, so it's kept separate from content/en.ts, es.ts, fr.ts rather
// than duplicated across all three. Keyed by slug (matching each entry's
// slug in content/*.ts's featuredProjects/otherProjects arrays), not by
// array position - that way the two lists can never silently fall out of
// sync just because someone reorders one of them.
//
// liveUrl is optional: a repo-only project has no live demo to link to.
export const PROJECT_LINKS: Record<string, { liveUrl?: string; githubUrl: string, imageUrl?: string }> = {
  "qms-platform": {
    liveUrl: "https://qms.sduran.dev",
    githubUrl: "https://github.com/sduran-ing/quality-management-platform",
    imageUrl: "https://raw.githubusercontent.com/sduran-ing/quality-management-platform/refs/heads/main/docs/screenshots/02-dashboard.png",
  },
  "u-belong": {
    liveUrl: "https://u-belong.lovable.app/",
    githubUrl: "https://github.com/sduran-ing/u-belong",
    imageUrl: "https://raw.githubusercontent.com/sduran-ing/u-belong/refs/heads/main/docs/screenshots/01-main-page.png",
  },
  "smart-budget": {
    githubUrl: "https://github.com/sduran-ing/smart-budget-app",
  },
  "task-bot": {
    githubUrl: "https://github.com/sduran-ing/taskbot",
  },
};