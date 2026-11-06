"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, MotionConfig, useInView, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GalleryBrowser from "./GalleryBrowser";

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
      "translate(150 18) rotate(10) scale(1.05)",
      "translate(70 62) rotate(18) scale(.82)",
      "translate(0 150) rotate(-10) scale(.82)",
      "translate(0 262) rotate(-38) scale(.65)",
    ],
  },
  {
    viewBox: "0 0 265 185",
    className: "right-0 top-0 w-[36vw] md:w-[16.5rem]",
    leaves: [
      "translate(5 62) rotate(-20) scale(.95)",
      "translate(100 180) rotate(-52) scale(.95)",
      "translate(225 150) rotate(-74) scale(.7)",
    ],
  },
  {
    viewBox: "0 0 270 150",
    className: "bottom-0 right-0 hidden w-[17rem] md:block",
    leaves: [
      "translate(5 45) rotate(-4) scale(1.05)",
      "translate(70 145) rotate(-24) scale(.95)",
      "translate(150 10) rotate(30) scale(.5)",
    ],
  },
  {
    viewBox: "0 0 210 125",
    className: "bottom-0 left-0 hidden w-[13rem] md:block",
    leaves: ["translate(45 110) rotate(-68) scale(.68)", "translate(85 115) rotate(-32) scale(.8)"],
  },
];

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SPRIGS.map(({ viewBox, className, leaves }) => (
        <svg key={viewBox} viewBox={viewBox} fill="#291c0d" className={`absolute ${className}`}>
          {leaves.map((transform) => (
            <path key={transform} d={LEAF} transform={transform} />
          ))}
        </svg>
      ))}
    </div>
  );
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const animate = inView ? "show" : "hidden";

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="gallery"
        aria-labelledby="gallery-heading"
        className="relative overflow-hidden bg-[#100c07]"
      >
        <Backdrop />
        <div className="relative mx-auto max-w-[104.5rem] px-6 pb-14 pt-14 md:px-10 md:pb-16 md:pt-16 lg:px-[2.75rem] lg:pb-[3.375rem] lg:pt-[3.2rem]">
          <motion.div variants={sequence} initial="hidden" animate={animate} className="flex flex-col items-center text-center">
            <motion.p
              variants={fade}
              className="flex items-center gap-3 text-xs leading-none tracking-[0.34em] text-gold lg:gap-[1.5rem] lg:text-[1.125rem] lg:tracking-[0.335em]"
            >
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4rem]" />
              OUR GALLERY
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4rem]" />
            </motion.p>
            <motion.h2
              id="gallery-heading"
              variants={rise}
              className="mt-3 font-display text-[9.8vw] font-normal leading-[1.14] text-white md:text-[3.5rem] lg:mt-[1.1rem] lg:text-[4.33rem] lg:leading-[4.5rem]"
            >
              A Glimpse Into{" "}
              <em className="block whitespace-nowrap text-gold md:inline">The Grove</em>
            </motion.h2>
            <motion.p
              variants={fade}
              className="mt-3 max-w-[32rem] text-[0.9375rem] leading-[1.6] text-[#d8d3c9] lg:mt-[0.8rem] lg:max-w-none lg:text-[1.288rem] lg:leading-[1.875rem]"
            >
              Explore the moments, flavors, and ambience that make The Grove a truly special dining destination.
            </motion.p>
          </motion.div>

          <div className="mt-7 lg:mt-[1.75rem]">
            <GalleryBrowser animate={animate} />
          </div>

          <motion.div variants={rise} initial="hidden" animate={animate} className="mt-8 flex justify-center lg:mt-[2.45rem]">
            <Link
              href="/gallery"
              className="bg-champagne group inline-flex h-14 items-center justify-center gap-3 rounded-full px-9 text-lg font-medium text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-100 lg:h-[3.9375rem] lg:w-[18.4375rem] lg:gap-[0.9rem] lg:px-0 lg:text-[1.35rem]"
            >
              View Full Gallery
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.5rem]"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
