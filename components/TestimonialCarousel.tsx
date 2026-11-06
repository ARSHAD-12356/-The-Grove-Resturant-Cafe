"use client";

import { useRef, type KeyboardEvent } from "react";
import { motion, type PanInfo, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { TESTIMONIALS } from "@/data/testimonials";
import { useInfiniteCarousel } from "@/hooks/useInfiniteCarousel";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Slots rendered either side of the active card. Wide enough that a dot jump never shows a gap. */
const SLOT_RANGE = 5;
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

const SLOT_OFFSETS = Array.from({ length: SLOT_RANGE * 2 + 1 }, (_, index) => index - SLOT_RANGE);

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (distance: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: distance * 0.16, ease: EASE },
  }),
};

const modulo = (value: number, size: number) => ((value % size) + size) % size;

export default function TestimonialCarousel({ animate }: { animate: "hidden" | "show" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const count = TESTIMONIALS.length;
  const { position, activeIndex, next, previous, goTo, setDragging, rootHandlers } = useInfiniteCarousel(rootRef, {
    count,
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") previous();
    if (event.key === "ArrowRight") next();
  };

  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    setDragging(false);
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) next();
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) previous();
  };

  const arrowClass =
    "flex size-11 cursor-pointer items-center justify-center rounded-full border-2 border-[#e8bd7b] text-[#f4dba0] transition-colors duration-300 hover:bg-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:size-[3.25rem]";

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Guest testimonials"
      onKeyDown={onKeyDown}
      {...rootHandlers}
      className="relative"
    >
      <div className="-mx-1 overflow-hidden px-1 py-5 lg:-my-[0.25rem] lg:mx-[6.25rem] lg:px-0 lg:py-[1rem]">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
          className="grid cursor-grab select-none active:cursor-grabbing"
        >
          {SLOT_OFFSETS.map((offset) => {
            const slot = position + offset;
            const testimonial = TESTIMONIALS[modulo(slot, count)];
            const isActive = offset === 0;
            return (
              <div
                key={slot}
                aria-hidden={Math.abs(offset) > 1}
                style={{ "--offset": offset } as React.CSSProperties}
                className={`testimonial-slot ${isActive ? "testimonial-slot-active" : ""}`}
              >
                <motion.div
                  variants={cardReveal}
                  custom={Math.abs(offset)}
                  initial="hidden"
                  animate={animate}
                  className="h-full"
                >
                  <TestimonialCard testimonial={testimonial} active={isActive} />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:mt-[1.8rem]">
        <ul className="order-first flex w-full items-center justify-center md:order-none md:mx-3 md:w-auto lg:mx-0">
          {TESTIMONIALS.map(({ id, name }, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={id} className="max-w-11 flex-1 md:flex-none">
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show review by ${name}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex h-11 w-full cursor-pointer items-center justify-center md:w-9 lg:h-[2rem] lg:w-[2rem]"
                >
                  <span
                    className={`block size-3.5 rounded-full border transition-colors duration-300 lg:size-[1rem] ${
                      isActive ? "border-gold-soft bg-[#fbc463]" : "border-[#e8bd7b] group-hover:bg-gold/40"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={previous}
          aria-label="Previous review"
          className={`${arrowClass} md:order-first lg:absolute lg:left-[2.56rem] lg:top-[calc(50%-3.25rem)]`}
        >
          <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-5 lg:size-[1.5rem]" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next review"
          className={`${arrowClass} lg:absolute lg:right-[2.4rem] lg:top-[calc(50%-3.25rem)]`}
        >
          <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-5 lg:size-[1.5rem]" />
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        Review {activeIndex + 1} of {count}, by {TESTIMONIALS[activeIndex].name}
      </p>
    </div>
  );
}
