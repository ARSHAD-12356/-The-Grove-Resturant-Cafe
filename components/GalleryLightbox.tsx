"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/data/galleryItems";

const SWIPE_DISTANCE = 50;

const subscribeToNothing = () => () => {};

type LightboxProps = {
  items: GalleryItem[];
  /** Position of the open photo within `items`, or null while closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Full-screen photo viewer. It renders into <body> because the section's animated, transformed
 * ancestors would otherwise trap its fixed positioning.
 */
export default function GalleryLightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const canUseDom = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = index !== null;
  const count = items.length;
  const hasSiblings = count > 1;

  const latest = useRef({ index, count, onClose, onNavigate });
  useEffect(() => {
    latest.current = { index, count, onClose, onNavigate };
  });

  const step = (direction: 1 | -1) => {
    const current = latest.current;
    if (current.index === null || current.count < 2) return;
    current.onNavigate((current.index + direction + current.count) % current.count);
  };
  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  });

  useEffect(() => {
    if (!isOpen) return;

    const opener = document.activeElement as HTMLElement | null;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        latest.current.onClose();
      } else if (event.key === "ArrowLeft") {
        stepRef.current(-1);
      } else if (event.key === "ArrowRight") {
        stepRef.current(1);
      } else if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll("button");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      opener?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  if (!canUseDom) return null;

  const item = index !== null ? items[index] : null;
  const controlClass =
    "flex size-11 items-center justify-center rounded-full border border-gold/70 bg-ink/60 text-gold-soft transition-colors duration-300 hover:bg-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:size-[3.25rem]";

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title}, photo ${index! + 1} of ${count}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(distance) >= SWIPE_DISTANCE) step(distance < 0 ? 1 : -1);
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070502]/92 px-4 py-20 md:px-24"
        >
          <p
            aria-live="polite"
            className="absolute left-5 top-6 text-sm tracking-[0.2em] text-gold-soft tabular-nums lg:left-[2rem] lg:top-[1.75rem] lg:text-[1.05rem]"
          >
            {index! + 1} / {count}
          </p>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className={`absolute right-4 top-4 ${controlClass} lg:right-[1.75rem] lg:top-[1.25rem]`}
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-5 lg:size-[1.5rem]" />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div
                className="relative w-[min(100vw-2rem,(100svh-11rem)*var(--photo-aspect))] overflow-hidden rounded-[0.875rem] border border-[#c9a77a] md:w-[min(100vw-12rem,(100svh-11rem)*var(--photo-aspect))]"
                style={
                  {
                    "--photo-aspect": item.width / item.height,
                    aspectRatio: item.width / item.height,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="90vw"
                  className="select-none object-cover"
                  draggable={false}
                />
              </div>
              <figcaption className="mt-3 text-center text-base text-white lg:text-[1.15rem]">{item.title}</figcaption>
            </motion.figure>
          </AnimatePresence>

          {hasSiblings && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className={`absolute bottom-5 left-[calc(50%-3.5rem)] md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 ${controlClass} lg:left-[1.75rem]`}
              >
                <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-6 lg:size-[1.6rem]" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className={`absolute bottom-5 right-[calc(50%-3.5rem)] md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2 ${controlClass} lg:right-[1.75rem]`}
              >
                <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-6 lg:size-[1.6rem]" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
