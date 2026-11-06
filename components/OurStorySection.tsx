"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, useInView, type Variants } from "framer-motion";
import { ArrowRight, Sprout, Store, Trophy, UsersRound, type LucideIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const MILESTONES: { year: string; title: string; Icon: LucideIcon }[] = [
  { year: "2019", title: "The Beginning", Icon: Sprout },
  { year: "2021", title: "Our First Outlet", Icon: Store },
  { year: "2023", title: "A Growing Family", Icon: UsersRound },
  { year: "Today", title: "A Beloved Destination", Icon: Trophy },
];

const MILESTONE_GAP = 0.32;

const page: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const copy: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const mainPhoto: Variants = {
  hidden: { opacity: 0, scale: 1.035 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { opacity: { duration: 0.9, ease: "easeIn" }, scale: { duration: 1.3, ease: EASE } },
  },
};

const print: Variants = {
  hidden: ({ rotate }: { rotate: number }) => ({ opacity: 0, y: 34, rotate: rotate * 1.6 }),
  show: ({ rotate, delay }: { rotate: number; delay: number }) => ({
    opacity: 1,
    y: 0,
    rotate,
    transition: { duration: 0.75, delay, ease: EASE },
  }),
};

const milestone: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: index * MILESTONE_GAP, ease: EASE },
  }),
};

const milestoneIcon: Variants = {
  hidden: { scale: 0.7 },
  show: (index: number) => ({
    scale: 1,
    transition: { duration: 0.7, delay: index * MILESTONE_GAP, ease: EASE },
  }),
};

const connectorX: Variants = {
  hidden: { scaleX: 0 },
  show: (index: number) => ({
    scaleX: 1,
    transition: { duration: 0.5, delay: index * MILESTONE_GAP + 0.12, ease: "easeInOut" },
  }),
};

const connectorY: Variants = {
  hidden: { scaleY: 0 },
  show: (index: number) => ({
    scaleY: 1,
    transition: { duration: 0.5, delay: index * MILESTONE_GAP + 0.12, ease: "easeInOut" },
  }),
};

/** A print in a cream frame. Only the photo zooms on hover, so the frame never moves under the cursor. */
function PolaroidPhoto({
  src,
  alt,
  rotate,
  delay,
  className,
}: {
  src: string;
  alt: string;
  rotate: number;
  delay: number;
  className: string;
}) {
  return (
    <motion.figure
      variants={print}
      custom={{ rotate, delay }}
      className={`group absolute rounded-[0.25rem] bg-[#efe3cd] p-[1.04%] shadow-[0_0.6rem_1.6rem_rgb(0_0_0/0.55)] ${className}`}
    >
      <div className="relative size-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          loading="eager"
          sizes="(min-width: 1024px) 15rem, 36vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>
    </motion.figure>
  );
}

function Collage() {
  return (
    <motion.div className="relative mx-auto mb-[12%] w-full max-w-[36rem] md:mb-[5.5rem] lg:mx-0 lg:mb-0 lg:max-w-none">
      <motion.div
        variants={mainPhoto}
        className="relative aspect-[675/689] overflow-hidden rounded-[2.1rem] border-[0.17rem] border-[#ecc488] transition-shadow duration-500 hover:shadow-[0_0_2rem_rgb(232_184_113/0.25)]"
      >
        <Image
          src="/images/story/restaurant-exterior.webp"
          alt="The Grove restaurant at dusk, with its illuminated sign, arched windows, climbing plants and outdoor tables"
          fill
          unoptimized
          loading="eager"
          sizes="(min-width: 1024px) 43rem, (min-width: 768px) 36rem, 100vw"
          className="object-cover"
        />
      </motion.div>
      <PolaroidPhoto
        src="/images/story/chef-plating.webp"
        alt="Black and white close-up of a chef plating a dish with tweezers"
        rotate={-8.2}
        delay={0}
        className="left-[-3.02%] top-[64.78%] aspect-[238/254] w-[35.26%]"
      />
      <PolaroidPhoto
        src="/images/story/artisan-coffee.webp"
        alt="Coffee cup with leaf latte art on a dark saucer"
        rotate={11.4}
        delay={0.14}
        className="left-[30.87%] top-[77.92%] aspect-[221/207] w-[32.7%]"
      />
    </motion.div>
  );
}

function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.4 });

  return (
    <motion.ol
      ref={listRef}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="mt-8 flex flex-col gap-7 md:grid md:grid-cols-4 md:gap-0 lg:-ml-[2.625rem] lg:mt-[2.7rem] lg:grid-cols-[12rem_12.125rem_12.5rem_13.5rem]"
    >
      {MILESTONES.map(({ year, title, Icon }, index) => {
        const isLast = index === MILESTONES.length - 1;
        return (
          <li key={year} className="relative flex items-center gap-4 md:flex-col md:gap-0 md:text-center">
            {!isLast && (
              <>
                <motion.span
                  aria-hidden="true"
                  variants={connectorX}
                  custom={index}
                  className="absolute left-[calc(50%+2.25rem)] top-[1.35rem] hidden h-px w-[calc(100%-4.5rem)] origin-left bg-gold/70 md:block lg:left-[calc(50%+3.4rem)] lg:top-[2.45rem] lg:w-[calc(100%-6.8rem)]"
                />
                <motion.span
                  aria-hidden="true"
                  variants={connectorY}
                  custom={index}
                  className="absolute left-[1.5rem] top-[3rem] h-[calc(100%-1.25rem)] w-px origin-top bg-gold/70 md:hidden"
                />
              </>
            )}
            <motion.div variants={milestone} custom={index} className="contents md:flex md:flex-col md:items-center">
              <motion.span
                variants={milestoneIcon}
                custom={index}
                className="flex size-12 shrink-0 items-center justify-center text-gold lg:size-[3rem]"
              >
                <Icon aria-hidden="true" strokeWidth={1.3} className="size-9 lg:size-[2.9rem]" />
              </motion.span>
              <span className="flex flex-col md:items-center">
                <span className="text-lg leading-tight font-medium text-gold-soft md:mt-1 lg:mt-[0.25rem] lg:text-[1.5rem]">
                  {year}
                </span>
                <span className="mt-0.5 text-[0.9375rem] leading-snug text-white md:text-sm lg:mt-[0.15rem] lg:whitespace-nowrap lg:text-[1.06rem]">
                  {title}
                </span>
              </span>
            </motion.div>
          </li>
        );
      })}
    </motion.ol>
  );
}

const LEAF = "M0 0C30-30 95-34 150 0C95 28 30 28 0 0Z";

const SPRIGS = [
  {
    viewBox: "0 0 320 280",
    className: "left-0 top-0 w-[42vw] md:w-[20rem]",
    leaves: [
      "translate(150 22) rotate(6) scale(1.05)",
      "translate(75 68) rotate(18) scale(.8)",
      "translate(0 175) rotate(-22) scale(.65)",
      "translate(0 270) rotate(-40) scale(.6)",
    ],
  },
  {
    viewBox: "0 0 260 190",
    className: "right-0 top-0 w-[36vw] md:w-[16.25rem]",
    leaves: [
      "translate(5 62) rotate(-22) scale(.95)",
      "translate(70 185) rotate(-52) scale(.95)",
      "translate(205 178) rotate(-72) scale(.85)",
    ],
  },
  {
    viewBox: "0 0 290 210",
    className: "bottom-0 right-0 w-[38vw] md:w-[18rem]",
    leaves: [
      "translate(5 95) rotate(-6) scale(1.2)",
      "translate(120 15) rotate(32) scale(.65)",
      "translate(90 205) rotate(-32) scale(.85)",
      "translate(215 110) rotate(-68) scale(.68)",
    ],
  },
  {
    viewBox: "0 0 210 210",
    className: "bottom-0 left-0 hidden w-[13rem] md:block",
    leaves: ["translate(55 10) rotate(80) scale(.68)", "translate(40 190) rotate(-16) scale(.8)"],
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

export default function OurStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="story"
        aria-labelledby="story-heading"
        className="relative overflow-hidden bg-[#100c07]"
      >
        <Backdrop />
        <motion.div
          variants={page}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative mx-auto grid max-w-[104.5rem] gap-10 px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-20 lg:grid-cols-[36rem_1fr] lg:items-start lg:gap-[3rem] lg:pb-[8.75rem] lg:pl-[3.5rem] lg:pr-[1.5rem] lg:pt-[7rem] min-[73.75rem]:grid-cols-[42.1875rem_1fr] min-[73.75rem]:gap-[6.0625rem] min-[73.75rem]:pl-[5.625rem] min-[73.75rem]:pr-[3rem]"
        >
          <Collage />

          <motion.div variants={copy} className="lg:mt-[1rem]">
            <motion.p
              variants={rise}
              className="flex items-center gap-3 text-xs leading-none tracking-[0.34em] text-gold-soft lg:gap-[1.6rem] lg:text-[1.2rem] lg:tracking-[0.3em]"
            >
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4.3rem]" />
              OUR STORY
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4.3rem]" />
            </motion.p>
            <motion.h2
              id="story-heading"
              variants={rise}
              className="mt-4 font-display text-[10.4vw] font-normal leading-[1.14] text-white md:text-[4rem] lg:mt-[1.55rem] lg:text-[4.63rem] lg:leading-[5.25rem]"
            >
              <span className="block">The Story Behind</span>
              <em className="block text-gold">The Grove</em>
            </motion.h2>
            <motion.p
              variants={rise}
              className="mt-5 max-w-[42.5rem] text-base leading-[1.65] text-[#d8d3c9] md:text-lg lg:ml-[0.25rem] lg:mt-[0.95rem] lg:text-[1.45rem] lg:leading-[2.085rem]"
            >
              The Grove was born from a simple passion — to create a space where great food, exceptional coffee, and
              genuine hospitality bring people together. What started as a small café has grown into a beloved dining
              destination for food lovers.
            </motion.p>
            <motion.div variants={rise}>
              <Timeline />
            </motion.div>
            <motion.div variants={rise} className="mt-9 lg:ml-[0.25rem] lg:mt-[3.95rem]">
              <Link
                href="/our-story"
                className="bg-champagne group flex h-14 items-center justify-center gap-3 rounded-full px-8 text-[1.0625rem] font-medium text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-100 md:inline-flex lg:h-[4rem] lg:w-[18.4375rem] lg:gap-[0.9rem] lg:px-0 lg:text-[1.3rem]"
              >
                Read Our Full Story
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.5rem]"
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
