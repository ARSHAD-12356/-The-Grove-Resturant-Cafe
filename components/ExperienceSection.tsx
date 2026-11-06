"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, MotionConfig, useInView, type Variants } from "framer-motion";
import { ArrowRight, Leaf, UsersRound, Wine, type LucideIcon } from "lucide-react";
import StatsCounter from "./StatsCounter";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES: { title: string; description: string; Icon: LucideIcon }[] = [
  { title: "Elegant Dining Space", description: "A sophisticated setting for a memorable experience.", Icon: Wine },
  { title: "Perfect for Gatherings", description: "Celebrate with family, friends or colleagues.", Icon: UsersRound },
  { title: "Warm & Cozy Atmosphere", description: "Comfort, style and great food, all in one place.", Icon: Leaf },
];

const page: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const copy: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.05, staggerChildren: 0.14 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const featureList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const collage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.17 } },
};

const photoReveal: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.05, ease: EASE } },
};

const headingLetters: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const headingLetter: Variants = {
  hidden: { opacity: 0, y: "0.5em", rotate: 5 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Reveals a line letter by letter, keeping words whole so they never break mid-word. */
function AnimatedLine({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`block ${className ?? ""}`}>
      {text.split(" ").map((word, wordIndex, words) => (
        <span key={word}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((letter, letterIndex) => (
              <motion.span key={letterIndex} variants={headingLetter} className="inline-block origin-bottom-left">
                {letter}
              </motion.span>
            ))}
          </span>
          {wordIndex < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

function Photo({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className: string }) {
  return (
    <motion.div
      variants={photoReveal}
      className={`group relative overflow-hidden rounded-[0.875rem] border border-[#b39a78]/80 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
    </motion.div>
  );
}

function Backdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 230 195"
      fill="#21170b"
      className="pointer-events-none absolute right-0 top-0 w-[38vw] md:w-[14.4rem]"
    >
      <path d="M0 0C30-30 95-34 150 0C95 28 30 28 0 0Z" transform="translate(20 42) rotate(-14) scale(.8)" />
      <path d="M0 0C30-30 95-34 150 0C95 28 30 28 0 0Z" transform="translate(120 95) rotate(-42) scale(.7)" />
      <path d="M0 0C30-30 95-34 150 0C95 28 30 28 0 0Z" transform="translate(205 190) rotate(-78) scale(.85)" />
    </svg>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="ambience"
        aria-labelledby="ambience-heading"
        className="relative overflow-hidden bg-[#0f0b06]"
      >
        <Backdrop />
        <motion.div
          variants={page}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative mx-auto max-w-[104.5rem] px-6 pb-14 pt-16 md:px-10 md:pb-16 md:pt-20 lg:pb-[2.8125rem] lg:pl-[3.6875rem] lg:pr-[3.25rem] lg:pt-[4.375rem]"
        >
          <div className="grid gap-10 lg:grid-cols-[33.625rem_1fr] lg:gap-0">
            <motion.div variants={copy} className="lg:-mt-[0.25rem]">
              <motion.p
                variants={rise}
                className="flex items-center gap-3 text-xs leading-none tracking-[0.34em] text-gold lg:gap-[1.2rem] lg:text-[1.0625rem] lg:tracking-[0.355em]"
              >
                <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[3rem]" />
                THE EXPERIENCE
                <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[3rem]" />
              </motion.p>

              <motion.h2
                id="ambience-heading"
                aria-label="A Place for Every Occasion"
                variants={headingLetters}
                className="mt-4 font-display text-[12vw] font-normal leading-[1.14] text-white md:text-[4rem] lg:mt-[1.7rem] lg:text-[4.2rem] lg:leading-[4.2rem]"
              >
                <AnimatedLine text="A Place for" />
                <AnimatedLine text="Every Occasion" className="italic text-gold" />
              </motion.h2>

              <motion.p
                variants={rise}
                className="mt-4 max-w-[36rem] text-base leading-[1.65] text-[#b9b4aa] lg:mt-[0.7rem] lg:max-w-[32rem] lg:text-[1.15rem] lg:leading-[1.8125rem]"
              >
                From intimate dinners to joyful gatherings, experience a beautifully designed space that blends modern
                elegance with a warm, welcoming atmosphere.
              </motion.p>

              <motion.ul variants={featureList} className="mt-7 flex flex-col gap-5 lg:mt-[2.1rem] lg:gap-[1.6rem]">
                {FEATURES.map(({ title, description, Icon }) => (
                  <motion.li key={title} variants={rise} className="group flex items-center gap-4 lg:gap-[1.5rem]">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/70 text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold/10 lg:size-[3.75rem]">
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="size-6 transition-transform duration-300 group-hover:scale-110 lg:size-[1.9rem]"
                      />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[1.0625rem] leading-snug text-white lg:text-[1.245rem]">{title}</span>
                      <span className="mt-1 text-sm leading-snug text-[#b9b4aa] lg:mt-[0.45rem] lg:text-[0.985rem]">
                        {description}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={rise} className="mt-8 lg:mt-[2.125rem]">
                <a
                  href="#reservations"
                  className="bg-champagne group flex h-14 items-center justify-center gap-3 rounded-full px-8 text-[1.0625rem] font-medium text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-100 md:inline-flex lg:h-[3.5625rem] lg:w-[16.0625rem] lg:gap-[0.9rem] lg:px-0 lg:text-[1.16rem]"
                >
                  Explore Our Space
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.4rem]"
                  />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={collage}
              className="grid grid-cols-2 gap-3 md:grid-cols-[469fr_534fr] md:gap-4 lg:gap-[1.2rem]"
            >
              <Photo
                src="/images/experience/restaurant-interior.webp"
                alt="Restaurant interior with glowing pendant lights, arched windows and a candlelit table"
                sizes="(min-width: 1024px) 29rem, 100vw"
                className="col-span-2 aspect-[4/5] md:col-span-1 md:aspect-[469/632]"
              />
              <div className="col-span-2 flex flex-col gap-3 md:col-span-1 md:gap-4 lg:gap-[1.15rem]">
                <Photo
                  src="/images/experience/dining-hall.webp"
                  alt="Long dining hall with ivy-covered arches and rows of set tables"
                  sizes="(min-width: 1024px) 33rem, 100vw"
                  className="aspect-[16/9] md:aspect-auto md:flex-[299_1_0%]"
                />
                <div className="flex gap-3 md:flex-[316_1_0%] md:gap-4 lg:gap-[1.15rem]">
                  <Photo
                    src="/images/experience/candlelit-table.webp"
                    alt="Table lamp and wine glasses on a dark marble table"
                    sizes="(min-width: 1024px) 18rem, 50vw"
                    className="aspect-square flex-[284_1_0%] md:aspect-auto"
                  />
                  <Photo
                    src="/images/experience/garden-walkway.webp"
                    alt="Dining walkway lined with climbing plants and warm lanterns"
                    sizes="(min-width: 1024px) 15rem, 50vw"
                    className="aspect-square flex-[232_1_0%] md:aspect-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={rise} className="mt-10 lg:mt-[2.8125rem]">
            <StatsCounter />
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
