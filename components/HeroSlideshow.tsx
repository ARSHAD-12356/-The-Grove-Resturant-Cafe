"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";

/** How long each photo holds before the next one starts fading in. Keep in sync with globals.css. */
const HOLD_MS = 3000;
const FADE_MS = 1200;

/**
 * The current hero photo always comes first. `focus` is the horizontal centre of the subject (0 to 1):
 * phones can only show part of the frame, and it keeps each photo's subject in that window.
 */
const SLIDES = [
  { src: "/images/hero-bg.webp", focus: 0.72 },
  { src: "/images/hero/hero-slide-02.webp", focus: 0.42 },
  { src: "/images/hero/hero-slide-03.webp", focus: 0.56 },
  { src: "/images/hero/hero-slide-01.webp", focus: 0.72 },
  // On desktop the flowers would sit behind the headline, so this one starts larger and grows rightwards.
  { src: "/images/hero/hero-slide-04.webp", focus: 0.48, desktopStart: 1.3 },
];

/**
 * Each photo zooms in slowly while it is on screen, and carries on zooming while the next one fades
 * in over it, so the motion never stops. The animation runs on the compositor (CSS transform and
 * opacity), and the next photo is decoded before its turn, so changing slides cannot stutter.
 * It pauses off screen and in hidden tabs, and reduced-motion users stay on the first photo.
 */
export default function HeroSlideshow({ overlay, children }: { overlay?: ReactNode; children?: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let onScreen = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let current = 0;
    const images = [...root.querySelectorAll("img")];

    const schedule = (delay: number) => {
      clearTimeout(timer);
      timer = setTimeout(advance, delay);
    };

    function advance() {
      if (!onScreen || document.hidden) return; // Resumes from the observer or visibility handler.
      const next = (current + 1) % SLIDES.length;
      const ready = images[next]?.decode?.() ?? Promise.resolve();
      ready
        .catch(() => undefined)
        .then(() => {
          if (cancelled) return;
          setPrevious(current);
          setActive(next);
          current = next;
          schedule(HOLD_MS + FADE_MS);
        });
    }

    const resume = () => {
      if (onScreen && !document.hidden) schedule(HOLD_MS);
      else clearTimeout(timer);
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      resume();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", resume);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  return (
    // isolate keeps the slides' z-indexes in here, so the dark scrim behind the hero text stays on top.
    <div ref={rootRef} className="absolute inset-0 isolate">
      {SLIDES.map(({ src, focus, desktopStart }, index) => {
        const isActive = index === active;
        const isPrevious = index === previous;
        return (
          <div
            key={src}
            data-slide-state={isActive ? "active" : isPrevious ? "previous" : "idle"}
            className="hero-slide"
            style={
              {
                "--slide-focus": focus,
                ...(desktopStart && { "--slide-desktop-start": desktopStart, "--slide-desktop-origin": "0%" }),
              } as CSSProperties
            }
          >
            <div className="hero-slide-zoom">
              <Image
                src={src}
                alt=""
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "eager"}
                unoptimized
                decoding={index === 0 ? "sync" : "async"}
                sizes="100vw"
                className="object-cover"
              />
              {index === 0 && children}
            </div>
          </div>
        );
      })}
      {overlay}
    </div>
  );
}
