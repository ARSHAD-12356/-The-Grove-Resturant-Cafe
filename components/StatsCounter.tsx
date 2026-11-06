"use client";

import { useCallback, useRef } from "react";
import { Star, Trophy, UsersRound, Utensils, type LucideIcon } from "lucide-react";
import { useCountUpLoop } from "@/hooks/useCountUpLoop";

type Stat = {
  label: string;
  target: number;
  Icon: LucideIcon;
  format: (value: number) => string;
};

const formatThousands = (value: number) => {
  if (value >= 10000) return "10K+";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K+`;
  return `${Math.round(value)}+`;
};

const STATS: Stat[] = [
  { label: "Signature Dishes", target: 50, Icon: Utensils, format: (value) => `${Math.round(value)}+` },
  { label: "Happy Guests", target: 10000, Icon: UsersRound, format: formatThousands },
  { label: "Average Rating", target: 4.8, Icon: Star, format: (value) => value.toFixed(1) },
  { label: "Years of Excellence", target: 5, Icon: Trophy, format: (value) => `${Math.round(value)}+` },
];

export default function StatsCounter() {
  const barRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const writeValues = useCallback((progress: number) => {
    STATS.forEach(({ target, format }, index) => {
      const element = valueRefs.current[index];
      if (!element) return;
      const text = format(target * progress);
      if (element.textContent !== text) element.textContent = text;
    });
  }, []);

  useCountUpLoop(barRef, writeValues);

  return (
    <div
      ref={barRef}
      className="relative overflow-hidden rounded-[0.875rem] border border-[#b39a78]/80 bg-[#0f0b06]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/experience/stats-marble.webp')] bg-[length:100%_100%]"
      />
      <ul className="relative grid grid-cols-2 gap-y-7 py-7 md:grid-cols-4 md:gap-y-0 lg:h-[9.25rem] lg:grid-cols-[25.3rem_23.6rem_24.75rem_1fr] lg:py-0">
        {STATS.map(({ label, target, Icon, format }, index) => (
          <li
            key={label}
            className="group relative flex flex-col items-center justify-center gap-2 px-2 text-center lg:flex-row lg:gap-[1.8rem] lg:px-0"
          >
            {index > 0 && (
              <span
                aria-hidden="true"
                className="absolute inset-y-1 left-0 hidden w-px bg-gold/45 md:block lg:inset-y-[2.6rem]"
              />
            )}
            <Icon
              aria-hidden="true"
              strokeWidth={1.2}
              className="size-9 shrink-0 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 lg:size-[3.4rem]"
            />
            <div className="flex flex-col items-center">
              <span
                ref={(element) => {
                  valueRefs.current[index] = element;
                }}
                aria-hidden="true"
                className="text-[2.25rem] leading-none tracking-[-0.04em] text-gold-soft tabular-nums lg:text-[3rem]"
              >
                {format(0)}
              </span>
              <span className="sr-only">{format(target)} </span>
              <span className="mt-1.5 text-[0.8125rem] leading-tight text-white lg:mt-[0.8rem] lg:text-[1.05rem]">
                {label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
