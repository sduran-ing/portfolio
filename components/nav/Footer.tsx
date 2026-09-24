"use client";

import { useTranslations } from "@/context/LanguageContext";
import Container from "@/components/ui/Container";

// Page chrome (like NavBar), not a content section - that's why this lives
// in components/nav/ alongside NavBar rather than components/sections/.
export default function Footer() {
  const { t } = useTranslations();

  // Computed at render time, not hardcoded - this never goes stale, unlike
  // a copyright year typed directly into the content files would.
  const year = new Date().getFullYear();

  return (
    <footer className="py-8">
      {/*
        Decorative divider: centered like the content, shorter than it
        (max-w-xs, well under the content's max-w-5xl), and fading to
        transparent at both ends via a gradient - not a solid edge-to-edge
        border line like a plain <footer> border-t would give.
      */}
      <div className="mx-auto h-px w-full max-w-lg bg-linear-to-r from-transparent via-muted to-transparent" />

      <Container className="mt-8">
        {/*
          Mobile (default): flex-col, items-center - the two lines stack
          vertically, each centered. sm: and up: flex-row with
          justify-between, so they sit at opposite ends of one row instead.
          Kept as its own short div with a short class list (rather than
          one long combined string on Container) so each piece is easy to
          read and to edit on its own.
        */}
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-center text-sm text-faint sm:text-left">
            {"\u00A9"} {year} Santiago Duran. {t.footer.rights}
          </p>
          <p className="text-center text-sm text-faint sm:text-left">
            {t.footer.builtWith}
          </p>
        </div>
      </Container>
    </footer>
  );
}