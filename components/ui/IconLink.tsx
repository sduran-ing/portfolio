import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { getSmartLinkProps } from "@/lib/utils/linkHelpers";

interface IconLinkProps {
  href: string;
  // Hugeicons exports one renderer, and each icon
  // is just a plain data object describing SVG paths. IconSvgElement is the
  // type for that data object
  // Whoever uses <IconLink> passes in which icon they want, e.g.:
  //   import { GithubIcon } from "@hugeicons/core-free-icons";
  //   <IconLink icon={GithubIcon} ... />
  icon: IconSvgElement;
  label: string;
}

// Plain icon-plus-text link, no border or chip, used for the secondary
// GitHub/LinkedIn links in Contact
export default function IconLink({ href, icon, label }: IconLinkProps) {
  const { isExternal, anchorTarget, anchorRel } = getSmartLinkProps(href);
  const className =
    "inline-flex items-center gap-1.5 text-md text-muted hover:text-accent transition-colors";

  const content = (
    <>
      {/*
        HugeiconsIcon is the one renderer for every icon in the library.
        - icon: which icon to draw
        - size: width/height in pixels
        - strokeWidth: line thickness — the free tier is stroke-based line
          icons only (no filled/solid style), so this is the main way to
          adjust how heavy or light an icon looks
        Color isn't set here on purpose: it defaults to CSS "currentColor",
        so the icon always matches whatever text color className applies
        above (muted by default, accent on hover) without extra props.
      */}
      <HugeiconsIcon icon={icon} size={16} strokeWidth={1.5} />
      <span>{label}</span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target={anchorTarget} rel={anchorRel} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}