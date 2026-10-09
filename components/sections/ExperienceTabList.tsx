"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { ExperienceEntry } from "@/content/types";

interface ExperienceTabListProps {
  entries: ExperienceEntry[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

// The company picker for the Experience section. It's a vertical list on
// desktop (sm: and up) and turns into a horizontal scrollable row on
// mobile - same data, same click handler, just a different flex direction
// depending on viewport. Same idea as the vertical/horizontal switch
// LanguageSwitch and ThemeToggle already use elsewhere in the codebase.
export default function ExperienceTabList({
  entries,
  selectedIndex,
  onSelect,
}: ExperienceTabListProps) {
  // One ref per button so we can scroll the selected one into view without
  // querying the DOM by class name or index.
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Runs whenever the selection changes and brings that button into view
  // inside its scrollable container. "nearest" means it only scrolls if
  // the button isn't already visible, so it won't yank the list around
  // when the selected item is already on screen. "inline: center" is what
  // makes the horizontal mobile version feel right - it centers the
  // active tab instead of just barely revealing its edge.
  useEffect(() => {
    buttonRefs.current[selectedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedIndex]);

  return (
    <ul className="no-scrollbar flex gap-1 overflow-x-auto sm:w-48 sm:shrink-0 sm:flex-col sm:gap-1 sm:overflow-x-visible sm:overflow-y-auto">
      {entries.map((entry, index) => {
        const isSelected = index === selectedIndex;

        return (
          <li key={`${entry.companyShort}-${entry.dateRange}`} className="shrink-0 sm:w-full">
            <button
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              type="button"
              onClick={() => onSelect(index)}
              // "group" lets the label span below react to hover on the
              // whole button, not just the text itself. "relative" is what
              // the highlight span underneath positions itself against -
              // without it, "absolute" on that span would jump all the way
              // up to the nearest positioned ancestor instead of just this
              // button. whitespace-nowrap + sm:whitespace-normal is the same
              // mobile-pill / desktop-wrap split as before.
              className="group relative block w-full whitespace-nowrap px-3 py-2 text-left font-mono text-sm sm:whitespace-normal sm:px-4 sm:py-3"
            >
              {/* The highlight behind the selected company's name. Only one
                  of these ever exists in the DOM at a time - whichever
                  button is currently selected renders it, the rest don't.
                  Because every instance shares the same layoutId, Framer
                  Motion notices "this thing moved to a new position" when
                  selection changes and animates the jump between the old
                  spot and the new one, instead of it just snapping there.
                  That's the sliding-pill effect, and we never had to
                  calculate a single position ourselves. */}
              {isSelected && (
                <motion.span
                  layoutId="experience-tab-highlight"
                  className="absolute inset-0 rounded-md bg-surface-elevated"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}

              {/* relative + z-10 puts the label above the highlight span
                  regardless of paint order - an absolutely positioned
                  sibling would otherwise render on top of normal text even
                  though it comes first in the markup. */}
              <span
                className={`relative z-10 transition-colors ${
                  isSelected ? "text-ink" : "text-muted group-hover:text-ink"
                }`}
              >
                {entry.companyShort}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}