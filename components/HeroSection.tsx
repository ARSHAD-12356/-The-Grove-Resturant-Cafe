"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import { ArrowRight, CalendarDays, ChefHat, ChevronDown, CirclePlay, Coffee, Leaf } from "lucide-react";
import { GroveMark, HeadlineLeaf } from "./GroveMark";
import HeroSlideshow from "./HeroSlideshow";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  { label: "Chef's Specials", Icon: ChefHat },
  { label: "Artisan Coffee", Icon: Coffee },
  { label: "Fresh Ingredients", Icon: Leaf },
];

const sequence: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.45, staggerChildren: 0.16 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const featureList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/** The brand printed on the coffee cup, locked to the photograph's coordinates. */
function CupBranding() {
  return (
    <svg
      viewBox="0 0 90 56"
      aria-hidden="true"
      className="absolute left-[83.15%] top-[59.7%] w-[5.4%] text-[#2a2017] opacity-80"
    >
      <GroveMark x="26" y="0" width="38" height="36" />
      <text
        x="45"
        y="50"
        textAnchor="middle"
        fontSize="16"
        fill="currentColor"
        style={{ fontFamily: "var(--font-lora)" }}
      >
        The Grove
      </text>
    </svg>
  );
}

function Eyebrow() {
  return (
    <motion.p
      variants={rise}
      className="flex items-center gap-[0.9rem] text-[0.75rem] leading-none tracking-[0.34em] whitespace-nowrap text-gold-muted max-[359px]:gap-2 max-[359px]:tracking-[0.2em] lg:gap-[0.95rem] lg:text-[1rem] lg:tracking-[0.365em]"
    >
      <span aria-hidden="true" className="h-px w-8 bg-gold-muted lg:w-[3.25rem]" />
      RESTAURANT &amp; CAFÉ
      <span aria-hidden="true" className="h-px w-8 bg-gold-muted lg:w-[3.25rem]" />
    </motion.p>
  );
}

function Headline() {
  return (
    <motion.h1
      variants={rise}
      className="mt-4 font-display text-[10vw] font-normal leading-[1.12] tracking-[-0.005em] text-white md:mt-5 md:text-[3.5rem] lg:mt-[2.05rem] lg:text-[4.9rem] lg:leading-[5.3rem]"
    >
      <span className="block lg:tracking-[0.01em]">A Perfect Blend of</span>
      <span className="block md:inline">Food, Coffee </span>
      <span className="relative inline-block whitespace-nowrap italic text-gold lg:tracking-[-0.015em]">
        &amp; Ambience
        <HeadlineLeaf className="absolute left-full top-[-0.15em] ml-[0.2em] h-[0.95em] w-auto text-gold" />
      </span>
    </motion.h1>
  );
}

function Actions() {
  return (
    <motion.div variants={rise} className="mt-6 flex flex-col gap-3 md:flex-row md:gap-4 lg:mt-[2.875rem] lg:gap-[1.25rem]">
      <a
        href="#reservations"
        className="bg-champagne group flex h-[3.25rem] items-center justify-center gap-3 rounded-full px-8 text-[1.0625rem] text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-100 lg:h-[3.9375rem] lg:w-[16.4375rem] lg:gap-[0.7rem] lg:px-0 lg:text-[1.25rem]"
      >
        <CalendarDays strokeWidth={1.5} className="size-5 lg:size-[1.6rem]" />
        Book a Table
        <ArrowRight
          strokeWidth={1.5}
          className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.6rem]"
        />
      </a>
      <a
        href="#our-story"
        className="flex h-[3.25rem] items-center justify-center gap-3 rounded-full border border-gold/80 px-8 text-[1.0625rem] text-white transition-colors duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-soft lg:h-[3.9375rem] lg:w-[16.1875rem] lg:gap-[0.8rem] lg:px-0 lg:text-[1.25rem]"
      >
        <CirclePlay strokeWidth={1.5} className="size-5 lg:size-[1.6rem]" />
        Watch Our Story
      </a>
    </motion.div>
  );
}

function Features() {
  return (
    <motion.ul variants={featureList} className="mt-6 grid grid-cols-3 md:flex lg:mt-[5.375rem]">
      {FEATURES.map(({ label, Icon }, index) => (
        <motion.li
          key={label}
          variants={rise}
          className={`group flex flex-col items-center gap-2 px-1 text-center md:flex-row md:gap-3 md:px-6 md:text-left lg:h-[2.875rem] lg:gap-[1rem] lg:px-[2rem] ${
            index > 0 ? "border-l border-gold/40" : "md:pl-0 lg:pl-[0.2rem]"
          }`}
        >
          <Icon
            strokeWidth={1.25}
            className="size-7 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 lg:size-[2.4rem]"
          />
          <span className="text-[0.8125rem] leading-tight text-white transition-colors [text-shadow:0_1px_6px_rgb(0_0_0/0.95)] lg:[text-shadow:none] duration-300 group-hover:text-gold-soft md:text-base lg:whitespace-nowrap lg:text-[1.02rem] lg:tracking-[-0.01em]">
            {label}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function ScrollIndicator() {
  return (
    <motion.a
      href="#our-story"
      aria-label="Scroll down"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
      className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 lg:bottom-[1rem]"
    >
      <span className="animate-scroll-float flex flex-col items-center text-white">
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/90 bg-ink/20 pt-1.5 lg:h-[2.5rem] lg:w-[1.6rem] lg:pt-[0.5rem]">
          <span className="h-2 w-px bg-gold-soft lg:h-[0.6rem]" />
        </span>
        <span className="mt-2 text-xs leading-none text-white/85 lg:mt-[0.75rem] lg:text-[0.9375rem]">Scroll Down</span>
        <ChevronDown strokeWidth={1.5} className="mt-0.5 size-4 text-gold-soft lg:mt-[0.3rem] lg:size-[1.1rem]" />
      </span>
    </motion.a>
  );
}

export default function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        aria-label="Welcome to The Grove"
        className="relative flex min-h-svh flex-col overflow-hidden bg-ink lg:justify-center"
      >
        <div aria-hidden="true" className="hero-media-frame absolute inset-0">
          <div className="hero-media">
            <HeroSlideshow overlay={<div className="hero-media-fade absolute inset-0 z-[1]" />}>
              <CupBranding />
            </HeroSlideshow>
          </div>
          <div className="hero-scrim absolute inset-0" />
        </div>

        <motion.div
          variants={sequence}
          initial="hidden"
          animate="show"
          className="relative z-10 px-6 pb-[max(13rem,40vw)] pt-24 md:px-10 md:pt-32 lg:px-[4.1875rem] lg:pb-[6.5rem] lg:pt-[7.25rem]"
        >
          <Eyebrow />
          <Headline />
          <motion.p
            variants={rise}
            className="mt-4 max-w-[40.625rem] font-sans text-base font-light leading-[1.6] text-[#d2cdc3] md:text-lg lg:text-mist lg:mt-[1.05rem] lg:max-w-[42rem] lg:text-[1.6rem] lg:leading-[2.2rem]"
          >
            Savor chef-crafted dishes, handcrafted beverages, and a warm, luxurious dining experience — all in one place.
          </motion.p>
          <Actions />
          <Features />
        </motion.div>

        <ScrollIndicator />
      </section>
    </MotionConfig>
  );
}
