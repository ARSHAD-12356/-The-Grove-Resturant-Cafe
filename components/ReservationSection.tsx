"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, MotionConfig, useInView, type Variants } from "framer-motion";
import ReservationBenefits from "./ReservationBenefits";
import ReservationForm from "./ReservationForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const sequence: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.16 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

const photoReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { opacity: { duration: 0.9, ease: "easeIn" }, scale: { duration: 1.4, ease: EASE } },
  },
};

const headingLetters: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const headingLetter: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Letters rise in one at a time, while whole words stay together so lines never break mid-word. */
function LetterReveal({ text }: { text: string }) {
  return text.split(" ").map((word, wordIndex, words) => (
    <span key={word}>
      <span className="inline-block whitespace-nowrap">
        {word.split("").map((letter, letterIndex) => (
          <motion.span key={letterIndex} variants={headingLetter} className="inline-block">
            {letter}
          </motion.span>
        ))}
      </span>
      {wordIndex < words.length - 1 && " "}
    </span>
  ));
}

const LEAF = "M0 0C30-30 95-34 150 0C95 28 30 28 0 0Z";

const SPRIGS = [
  {
    viewBox: "0 0 270 270",
    className: "left-0 top-0 w-[38vw] md:w-[17rem]",
    leaves: [
      "translate(125 12) rotate(4) scale(.95)",
      "translate(55 55) rotate(14) scale(.72)",
      "translate(0 150) rotate(-14) scale(.42)",
      "translate(0 262) rotate(-42) scale(.6)",
    ],
  },
  {
    viewBox: "0 0 200 185",
    className: "right-0 top-0 w-[32vw] md:w-[12.5rem]",
    leaves: ["translate(5 60) rotate(-20) scale(.75)", "translate(70 180) rotate(-58) scale(.85)"],
  },
  {
    viewBox: "0 0 260 190",
    className: "bottom-0 right-0 hidden w-[16rem] md:block",
    leaves: [
      "translate(5 135) rotate(-6) scale(1)",
      "translate(110 185) rotate(-22) scale(.8)",
      "translate(190 65) rotate(40) scale(.45)",
    ],
  },
  {
    viewBox: "0 0 180 120",
    className: "bottom-0 left-0 hidden w-[11rem] md:block",
    leaves: ["translate(20 115) rotate(-58) scale(.6)", "translate(60 110) rotate(-16) scale(.7)"],
  },
];

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SPRIGS.map(({ viewBox, className, leaves }) => (
        <svg key={viewBox} viewBox={viewBox} fill="#2a1d0e" className={`absolute ${className}`}>
          {leaves.map((transform) => (
            <path key={transform} d={LEAF} transform={transform} />
          ))}
        </svg>
      ))}
    </div>
  );
}

export default function ReservationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const animate = inView ? "show" : "hidden";

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="reservations"
        aria-labelledby="reservation-heading"
        className="relative overflow-hidden bg-[#100c06]"
      >
        <Backdrop />
        <div className="relative mx-auto grid max-w-[104.5rem] gap-9 px-6 pb-14 pt-14 md:px-10 md:pb-16 md:pt-16 lg:grid-cols-[30rem_minmax(0,1fr)] lg:items-start lg:gap-[2rem] lg:pb-[6.5rem] lg:pl-[2rem] lg:pr-[2rem] lg:pt-[6.5rem] min-[73.75rem]:grid-cols-[37.875rem_minmax(0,1fr)] min-[73.75rem]:gap-[3.375rem] min-[73.75rem]:pl-[3.5625rem] min-[73.75rem]:pr-[2.97rem]">
          <motion.div
            initial="hidden"
            animate={animate}
            variants={fade}
            className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border-[0.17rem] border-[#ecc488] shadow-[0_0_1.5rem_rgb(232_184_113/0.14)] md:aspect-[16/11] lg:aspect-[606/732] lg:rounded-[2rem]"
          >
            <motion.div variants={photoReveal} className="absolute inset-0">
              <Image
                src="/images/reservation/reserved-dining-table.webp"
                alt="Candlelit dining table with flowers, wine glasses, a lamp and a small Reserved sign"
                fill
                unoptimized
                loading="eager"
                sizes="(min-width: 1024px) 38rem, 100vw"
                className="object-cover object-[50%_80%] transition-transform duration-700 ease-out group-hover:scale-[1.04] lg:object-center"
              />
            </motion.div>
          </motion.div>

          <div className="lg:-mt-[1.85rem]">
            <motion.div
              variants={sequence}
              initial="hidden"
              animate={animate}
              className="flex flex-col items-center text-center"
            >
              <motion.p
                variants={fade}
                className="flex items-center gap-3 text-xs leading-none tracking-[0.34em] text-gold lg:gap-[1.6rem] lg:pr-[2.5rem] lg:text-[1.25rem] lg:tracking-[0.3em]"
              >
                <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4.75rem]" />
                RESERVATION
                <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4.75rem]" />
              </motion.p>

              <motion.h2
                id="reservation-heading"
                aria-label="Reserve Your Table"
                variants={headingLetters}
                className="mt-3 font-display text-[12vw] font-normal leading-[1.12] text-white md:text-[4rem] lg:mt-[0.7rem] lg:text-[4.72rem] lg:leading-[5rem]"
              >
                <span aria-hidden="true" className="block md:inline">
                  <LetterReveal text="Reserve" />{" "}
                </span>
                <em aria-hidden="true" className="block text-gold md:inline">
                  <LetterReveal text="Your Table" />
                </em>
              </motion.h2>

              <motion.p
                variants={fade}
                className="mt-3 max-w-[44.5rem] text-[0.9375rem] leading-[1.6] text-[#e4dfd5] md:text-lg lg:mt-[0.9rem] lg:text-[1.425rem] lg:leading-[2.15rem]"
              >
                Plan your perfect dining experience at The Grove. Book your table in advance and let us take care of the
                rest.
              </motion.p>
            </motion.div>

            <motion.div
              variants={rise}
              initial="hidden"
              animate={animate}
              className="relative z-10 mt-7 lg:mt-[2.15rem]"
            >
              <ReservationForm animate={animate} />
            </motion.div>

            <div className="mt-8 lg:mt-[2.6rem]">
              <ReservationBenefits animate={animate} />
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
