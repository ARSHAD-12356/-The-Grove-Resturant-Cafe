import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | The Grove",
  description: "The full story of The Grove is coming soon.",
  robots: { index: false },
};

/** Placeholder until the full story page is written. */
export default function OurStoryPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="text-xs tracking-[0.34em] text-gold">OUR STORY</p>
      <h1 className="mt-4 font-display text-5xl font-normal text-white md:text-6xl">
        The full story is <em className="text-gold">coming soon</em>
      </h1>
      <Link
        href="/#story"
        className="bg-champagne mt-9 inline-flex h-14 items-center gap-3 rounded-full px-8 text-[1.0625rem] font-medium text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110"
      >
        <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
        Back to The Grove
      </Link>
    </main>
  );
}
