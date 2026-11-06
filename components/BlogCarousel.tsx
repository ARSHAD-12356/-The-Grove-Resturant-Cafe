"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion, type Variants } from "framer-motion";
import BlogCard from "./BlogCard";
import { useDragRail } from "./useDragRail";
import { BLOG_POSTS } from "@/data/blogPosts";

const EASE = [0.22, 1, 0.36, 1] as const;
const PHONE_ONLY = "(max-width: 767px)";

const cardList: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.16 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const POSTS = BLOG_POSTS.slice(0, 3);

/**
 * Phones get a single swipeable row with the next card peeking in, plus dots. It only ever moves
 * when someone swipes, drags or taps a dot. From tablet up the same list is an ordinary grid.
 */
export default function BlogCarousel({ animate }: { animate: "hidden" | "show" }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // motion.ul claims onDragStart for its own gestures, so the native handler goes on the capture phase.
  const {
    railHandlers: { onDragStart: preventNativeDrag, ...railHandlers },
  } = useDragRail(railRef, { dragFromLinks: true });

  const scrollLeftFor = (card: HTMLElement, rail: HTMLElement) =>
    card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2;

  const nearestIndex = () => {
    const rail = railRef.current;
    if (!rail) return 0;
    const cards = [...rail.children] as HTMLElement[];
    let nearest = 0;
    let smallest = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(scrollLeftFor(card, rail) - rail.scrollLeft);
      if (distance < smallest) {
        smallest = distance;
        nearest = index;
      }
    });
    return nearest;
  };

  const goTo = (index: number) => {
    const rail = railRef.current;
    const card = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: scrollLeftFor(card, rail), behavior: reduced ? "auto" : "smooth" });
  };

  const onPointerDown = (event: PointerEvent<HTMLUListElement>) => {
    if (window.matchMedia(PHONE_ONLY).matches) railHandlers.onPointerDown(event);
  };

  const onPointerUp = (event: PointerEvent<HTMLUListElement>) => {
    railHandlers.onPointerUp();
    // Touch snaps natively; a mouse drag is settled onto the nearest card here.
    if (event.pointerType === "mouse" && window.matchMedia(PHONE_ONLY).matches) goTo(nearestIndex());
  };

  return (
    <>
      <motion.ul
        ref={railRef}
        variants={cardList}
        initial="hidden"
        animate={animate}
        aria-label="Blog articles"
        {...railHandlers}
        onDragStartCapture={preventNativeDrag}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onScroll={() => setActiveIndex(nearestIndex())}
        className="no-scrollbar relative -mx-6 mt-8 flex cursor-grab select-none gap-4 overflow-x-auto overscroll-x-contain px-6 active:cursor-grabbing [@media(hover:none)]:snap-x [@media(hover:none)]:snap-mandatory md:mx-0 md:grid md:cursor-auto md:select-auto md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:mt-[3rem] lg:grid-cols-3 lg:gap-[2.0625rem]"
      >
        {POSTS.map((post) => (
          <motion.li
            key={post.id}
            variants={cardReveal}
            className="w-[84vw] max-w-[22rem] shrink-0 snap-center md:w-auto md:max-w-none md:last:col-span-2 md:last:mx-auto md:last:w-[calc(50%-0.75rem)] lg:last:col-span-1 lg:last:mx-0 lg:last:w-auto"
          >
            <BlogCard post={post} />
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-2 flex justify-center md:hidden">
        {POSTS.map((post, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={post.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show article ${index + 1} of ${POSTS.length}: ${post.title}`}
              aria-current={isActive ? "true" : undefined}
              className="group flex size-11 cursor-pointer items-center justify-center"
            >
              <span
                className={`block size-3 rounded-full border transition-colors duration-300 ${
                  isActive ? "border-gold-soft bg-[#fbc463]" : "border-[#e8bd7b] group-hover:bg-gold/40"
                }`}
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
