import Tag from "@/components/ui/Tag";
import type { ExperienceEntry } from "@/content/types";

interface ExperienceItemProps {
  entry: ExperienceEntry;
}

// The detail panel for whichever company is currently selected in
// ExperienceTabList. Only one entry is ever mounted at a time -
// Experience.tsx swaps which entry gets passed in when the user clicks a
// different tab.
export default function ExperienceItem({ entry }: ExperienceItemProps) {
  // description still stores each bullet point separated by a literal
  // "\n" - same convention as before. filter(Boolean) drops any empty
  // line from a trailing "\n" so we don't render a blank bullet.
  const bullets = entry.description.split("\n").filter(Boolean);

  return (
    <div>
      {/* Company name now sits on its own line above the role, styled as a
          small mono all-caps label - same treatment as SectionLabel -
          instead of being crammed onto one line as "Role @ Company". Reads
          more like this site's own type system and less like the generic
          pattern we started from. */}
      <p className="font-mono text-sm uppercase tracking-wider text-accent">
        {entry.companyFull}
      </p>
      <h3 className="mt-1 font-heading text-2xl font-semibold text-ink">
        {entry.role}
      </h3>
      <p className="mt-1 font-mono text-sm text-muted">{entry.dateRange}</p>

      {/* Numbered markers (01, 02, 03...) instead of plain bullet dots.
          padStart(2, "0") keeps two digits even past a 9th bullet, which
          won't happen here but costs nothing to handle properly. */}
      <ul className="mt-5 flex flex-col gap-3">
        {bullets.map((bullet, index) => (
          <li key={bullet} className="flex gap-3">
            {/* pt-0.5 is a small nudge so the number's baseline lines up
                with the first line of the bullet text instead of sitting
                a couple pixels too high. */}
            <span
              className="shrink-0 pt-0.5 font-mono text-sm text-accent"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-base leading-relaxed text-muted">{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {entry.tech.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </div>
  );
}