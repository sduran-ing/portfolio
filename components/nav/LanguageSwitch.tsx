"use client";

import { useTranslations } from "@/context/LanguageContext";

// Each language's active-state background approximates that flag's colors
// as a gradient (not a literal flag graphic)
const locales = [
  {
    code: "eng" as const,
    label: "ENG",
    activeBg:
      "linear-gradient(to right, transparent 45%, #C8102E 45% 55%, transparent 55%), linear-gradient(to bottom, #FFFFFF 45%, #C8102E 45% 55%, #FFFFFF 55%)",
  },
  {
    code: "esp" as const,
    label: "ESP",
    activeBg: "linear-gradient(to bottom, #AA151B 25%, #F1BF00 25% 75%, #AA151B 75%)",
  },
  {
    code: "fra" as const,
    label: "FRA",
    activeBg: "linear-gradient(to right, #0055A4 33%, #FFFFFF 33% 66%, #EF4135 66%)",
  },
];

interface LanguageSwitchProps {
  vertical?: boolean;
}

// Desktop (vertical=false, the default): its own border, three buttons
// side by side. Vertical: drops that own border/rounding entirely, so a
// parent (MobileMenu) can wrap this together with ThemeToggle inside one
// shared bordered list instead of two separately-outlined pieces.
export default function LanguageSwitch({ vertical = false }: LanguageSwitchProps) {
  const { locale, setLocale } = useTranslations();

  // Container layout: a horizontal bordered strip on desktop, or a plain
  // vertical stack (no border of its own) when nested inside MobileMenu.
  const containerClass = vertical
    ? "flex w-full flex-col"
    : "flex overflow-hidden rounded-md border border-muted";

  return (
    <div className={containerClass} role="group" aria-label="Language">
      {locales.map((option, index) => {
        const isActive = locale === option.code;

        // Divider between buttons: a bottom border on every row in
        // vertical mode (including the last row, since that's the line
        // between the last language row and whatever the parent stacks
        // right after it), or a left border between columns on desktop
        // (skipped on the first button, so it doesn't double up with the
        // outer border). Also, text-center for the language abbreviations
        const dividerClass = vertical
          ? "border-b border-muted text-center"
          : index > 0
            ? "border-l border-muted"
            : "";

        // Active gets flag-colored background with shadowed white text for
        // legibility against any flag color. Inactive matches the page
        // background so it reads as "off" until selected.
        const stateClass = isActive
          ? "text-white text-shadow-sm-heavy"
          : "bg-surface text-muted hover:text-accent";

        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLocale(option.code)}
            aria-current={isActive ? "true" : undefined}
            // The flag gradient is inline (not a Tailwind class) because
            // it's a different value per language, computed from the data
            // above rather than a fixed set of utilities.
            style={isActive ? { backgroundImage: option.activeBg } : undefined}
            className={`px-3 py-2 font-mono text-sm font-semibold transition-colors cursor-pointer ${dividerClass} ${stateClass}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}