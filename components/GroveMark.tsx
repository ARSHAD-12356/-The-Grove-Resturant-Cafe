import type { SVGProps } from "react";

/** The Grove's fork-and-leaves brand mark. Inherits colour from `currentColor`. */
export function GroveMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 56 52"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21.5 1.5v9.5a6.5 6.5 0 0 0 13 0V1.5" />
      <path d="M26 1.5V12M30 1.5V12" />
      <path d="M28 17.5V51" />
      <path d="M26 44C17 44 6.5 38 1 24c9.5-1 22 3.5 25 20Z" />
      <path d="M8 29c6 2.5 11.5 7 15 12" />
      <path d="M30 44c3-13.5 13.5-22 25-23-2.5 12.5-13 22-25 23Z" />
      <path d="M33 41c3-3 5.5-7 7-11.5M38.5 35.5l5.5-1" />
    </svg>
  );
}

/** Large veined leaf with a small companion leaf, floating beside the headline. */
export function HeadlineLeaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 56 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 48C2 26 22 8 55 2c1 25-15 47-44 47" />
      <path d="M3 48C16 36 30 22 45 12" />
      <path d="M14 37l-1-12M21 31l-1-13M28 25l-1-12M36 19v-8M14 37l15 1M21 31l16 .5M28 25l15-.5M36 19l10-1" />
      <path d="M3 62c7-3.5 15-2.5 21 1-7 4-16 3.5-21-1ZM8 62.5c4-.5 8 0 12 .5" />
    </svg>
  );
}
