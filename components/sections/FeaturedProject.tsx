import Image from "next/image";
import Button from "@/components/ui/Button";

interface FeaturedProjectProps {
  name: string;
  description: string;
  tech: string[];
  liveLabel: string;
  githubLabel: string;
  liveUrl: string;
  githubUrl: string;
  // Optional - not every project has a screenshot yet (smart-budget
  // doesn't), so this falls back to the placeholder text instead of
  // breaking or rendering next/image with an undefined src.
  imageUrl?: string;
}

export default function FeaturedProject({
  name,
  description,
  tech,
  liveLabel,
  githubLabel,
  liveUrl,
  githubUrl,
  imageUrl,
}: FeaturedProjectProps) {
  return (
    // items-center (not items-start): centers the text card against the
    // image's full height, instead of pinning it to the top edge.
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <a
        // relative + z-0 + overflow-hidden are for next/image's fill mode:
        // fill needs a positioned ancestor of a defined size to fill, and
        // overflow-hidden keeps the image clipped to this box's rounded
        // corners instead of spilling past them. z-0 pairs with the text
        // card's z-10 below - see that comment for why both are needed.        
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"

        // In the sm portview the h-85 determines the height of the screenshot and the w-[XX%] how much space it covers to the right 
        className="relative z-0 flex h-56 items-center justify-center overflow-hidden rounded-lg border border-muted bg-surface-elevated sm:h-85 sm:w-[58%] sm:shrink-0"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name} screenshot`}
            fill
            // object-cover: It maintains the image's original aspect ratio so that it never stretches, filling the entire container.
            // object-top: Change the anchor point. Instead of trimming the edges evenly from the center, 
            // fix the top edge in place and trim only the excess from the bottom and sides.
            className="object-cover object-top"
            sizes="(min-width: 640px) 58vw, 100vw"
          />
        ) : (
          <span className="text-sm text-muted">Screenshot placeholder</span>
        )}
      </a>

      {/*
        The entire text column is now ONE opaque card (not just the
        description paragraph like before). That matters because this
        whole block overlaps the image's edge via sm:-ml-11 - if only the
        description had a background, the title, tech line, and buttons
        around it would sit directly on the bare image with nothing behind
        them, which breaks the moment a real screenshot (not a flat
        placeholder color) is there. The card's own padding also creates
        the visual gap between the overlapping edge and the actual text,
        so nothing looks like it's crammed against the image.

        relative z-10 guarantees this card paints above the image in that
        overlapping region - z-index only takes effect on a positioned
        element, so relative is required here too, not just the number.
        Without this pairing, next/image's own internal positioning on
        the image next to it can end up winning the stacking order
        despite coming first in the DOM, which showed up as the left edge
        of this card's text rendering hidden behind the image.
      */}
      <div className="relative z-10 rounded-lg border border-muted bg-surface-elevated p-6 sm:-ml-20">
        <p className="font-sans text-xl font-semibold text-ink">{name}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink">{description}</p>
        <p className="mt-4 font-mono text-xs text-muted">
          {tech.join(" \u2192 ")}
        </p>
        <div className="mt-4 flex gap-2">
          <Button href={liveUrl} variant="outline">
            {liveLabel}
          </Button>
          <Button href={githubUrl} variant="secondary">
            {githubLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}