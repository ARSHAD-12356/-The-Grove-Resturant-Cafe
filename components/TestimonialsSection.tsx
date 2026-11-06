"use client";

import { useRef } from "react";
import { motion, MotionConfig, useInView, type Variants } from "framer-motion";
import TestimonialCarousel from "./TestimonialCarousel";
import TestimonialFeatures from "./TestimonialFeatures";

const EASE = [0.22, 1, 0.36, 1] as const;

const sequence: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.05, staggerChildren: 0.14 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

const LEAF = "M0 0C30-30 95-34 150 0C95 28 30 28 0 0Z";

const SPRIGS = [
  {
    viewBox: "0 0 310 270",
    className: "left-0 top-0 w-[42vw] md:w-[19.5rem]",
    leaves: [
      "translate(155 12) rotate(6) scale(1.05)",
      "translate(70 62) rotate(14) scale(.82)",
      "translate(0 130) rotate(-12) scale(.72)",
      "translate(0 255) rotate(-42) scale(.72)",
    ],
  },
  {
    viewBox: "0 0 250 185",
    className: "right-0 top-0 w-[36vw] md:w-[15.5rem]",
    leaves: [
      "translate(5 58) rotate(-20) scale(.95)",
      "translate(80 180) rotate(-52) scale(.95)",
      "translate(215 150) rotate(-74) scale(.7)",
    ],
  },
  {
    viewBox: "0 0 210 110",
    className: "bottom-0 right-0 hidden w-[13rem] md:block",
    leaves: ["translate(5 75) rotate(-8) scale(.8)", "translate(120 105) rotate(-48) scale(.65)"],
  },
  {
    viewBox: "0 0 170 100",
    className: "bottom-0 left-0 hidden w-[10.5rem] md:block",
    leaves: ["translate(10 95) rotate(-58) scale(.6)", "translate(60 100) rotate(-20) scale(.68)"],
  },
];

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SPRIGS.map(({ viewBox, className, leaves }) => (
        <svg key={viewBox} viewBox={viewBox} fill="#2f2010" className={`absolute ${className}`}>
          {leaves.map((transform) => (
            <path key={transform} d={LEAF} transform={transform} />
          ))}
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const animate = inView ? "show" : "hidden";

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className="relative overflow-hidden bg-[#130e07]"
      >
        <Backdrop />
        <div className="relative mx-auto max-w-[104.5rem] px-6 pb-14 pt-14 md:px-10 md:pb-16 md:pt-16 lg:px-0 lg:pb-[5.375rem] lg:pt-[2.5rem]">
          <motion.div
            variants={sequence}
            initial="hidden"
            animate={animate}
            className="flex flex-col items-center text-center"
          >
            <motion.p
              variants={fade}
              className="flex items-center gap-3 text-[0.6875rem] leading-none tracking-[0.3em] text-gold lg:gap-[1.3rem] lg:text-[1.2rem] lg:tracking-[0.3em]"
            >
              <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gold-muted md:w-9 lg:w-[4rem]" />
              <span className="whitespace-nowrap">GUEST TESTIMONIALS</span>
              <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gold-muted md:w-9 lg:w-[4rem]" />
            </motion.p>
            <motion.h2
              id="testimonials-heading"
              variants={rise}
              className="mt-3 font-display text-[10.4vw] font-normal leading-[1.14] text-white md:text-[3.5rem] lg:mt-[1.15rem] lg:text-[4.75rem] lg:leading-[4.5rem]"
            >
              Loved by <em className="whitespace-nowrap text-gold">Our Guests</em>
            </motion.h2>
            <motion.p
              variants={fade}
              className="mt-3 max-w-[32rem] text-[0.9375rem] leading-[1.6] text-[#e4dfd5] md:max-w-[42rem] lg:mt-[1.25rem] lg:max-w-none lg:text-[1.42rem] lg:leading-[1.875rem]"
            >
              Here&rsquo;s what our valued guests have to say about their experience at The Grove.
            </motion.p>
          </motion.div>

          <div className="mt-3 lg:mt-[2.5rem]">
            <TestimonialCarousel animate={animate} />
          </div>

          <motion.div
            variants={rise}
            initial="hidden"
            animate={animate}
            className="mt-8 lg:mx-[4.3rem] lg:mt-[2.7rem]"
          >
            <TestimonialFeatures />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
