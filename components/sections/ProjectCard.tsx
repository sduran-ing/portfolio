import Button from "@/components/ui/Button";

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  liveLabel: string;
  githubLabel: string;
  liveUrl?: string;
  githubUrl: string;
}

// Smaller, uniform card for every project after the first one. Unlike
// FeaturedProject, no overlapping-image treatment - just one plain
// bordered card. Reuses the same Button variants as FeaturedProject so
// featured and non-featured projects still feel like one consistent
// system, not two different designs bolted together.
export default function ProjectCard({
  name,
  description,
  tech,
  liveLabel,
  githubLabel,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-muted bg-surface-elevated p-5">
      <p className="font-sans text-base font-semibold text-ink">{name}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <p className="mt-3 font-mono text-xs text-muted">
        {tech.join(" \u2192 ")}
      </p>
      <div className="mt-4 flex gap-2">
        {liveUrl && (
          <Button href={liveUrl} variant="outline">
            {liveLabel} {"\u2197"}
          </Button>
        )}
        <Button href={githubUrl} variant="secondary">
          {githubLabel}
        </Button>
      </div>
    </div>
  );
}