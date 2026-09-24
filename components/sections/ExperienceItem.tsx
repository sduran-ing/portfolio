import Tag from "@/components/ui/Tag";
import type { ExperienceEntry } from "@/content/types";

interface ExperienceItemProps {
  entry: ExperienceEntry;
}

// One row in the Experience list. Date column sits beside the content on
// desktop (sm: and up), stacks above it on mobile - flex-col by default,
// switching to flex-row at the sm breakpoint.
export default function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-muted pb-8 last:border-none sm:flex-row sm:gap-6">
      <div className="shrink-0 font-mono text-sm text-muted sm:w-32">
        {entry.dateRange}
      </div>
      <div className="flex-1">
        <p className="font-sans text-base font-semibold text-ink">
          {entry.role} {"\u00B7"} {entry.company}
        </p>

        {/* whitespace-pre-wrap allows to read the /n command in the description text*/}
        <p className="mt-2 text-base leading-relaxed text-muted whitespace-pre-wrap">
          {entry.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {entry.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}