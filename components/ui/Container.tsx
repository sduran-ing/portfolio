import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

// Shared content width for every section - the max-w-5xl value here is
// the ONE place that controls how wide the whole site's content reads.
// Matches NavBar's own max-w-5xl (set directly there, not through this
// component, since a horizontal nav row and a vertical section don't share
// enough layout to be worth merging into one component) so the nav row and
// section content line up instead of the nav looking wider than the page.
export default function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto max-w-4xl px-6 ${className}`}>{children}</div>;
}