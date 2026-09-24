import Link from "next/link";
import { ReactNode } from "react";
import { getSmartLinkProps } from "@/lib/utils/linkHelpers";

type ButtonVariant = "filled" | "outline" | "secondary";

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
}

// Three variants:
// - filled: solid accent background. Reserved for the single Contact CTA.
// - outline: accent border and text. Default, for primary links.
// - secondary: muted neutral border and text. For a link that matters less
//   than the primary one beside it (e.g. GitHub next to Live demo).
const variantClasses: Record<ButtonVariant, string> = {
  filled:
    "bg-accent text-surface border border-accent hover:opacity-90",
  outline:
    "bg-transparent text-accent border border-accent hover:bg-accent hover:text-surface",
  secondary:
    "bg-transparent text-ink border border-muted hover:border-accent hover:text-accent",
};

export default function Button({ href, variant = "outline", children }: ButtonProps) {
  // http(s) and mailto: links leave the site or open the mail client
  // both get a plain <a> tag. Internal routes use next/link for client-side
  // navigation
  const { isExternal, anchorTarget, anchorRel } = getSmartLinkProps(href);
  const className = `inline-flex items-center gap-1 rounded-md px-4 py-1.5 text-md font-semibold font-sans transition-colors ${variantClasses[variant]}`;

  if (isExternal) {
    return (
      <a 
        href={href}
        target={anchorTarget}
        rel={anchorRel}
        className={className}
      >
        {children}  
      </a>
    );
  }

  // Interal routes
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}