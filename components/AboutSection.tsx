"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { ArrowRight, Coffee, Leaf, UsersRound, UtensilsCrossed } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 };

const FEATURES = [
  { lines: ["Exquisite", "Cuisine"], Icon: UtensilsCrossed },
  { lines: ["Premium", "Coffee"], Icon: Coffee },
  { lines: ["Fresh &", "Local Ingredients"], Icon: Leaf },
  { lines: ["Welcoming", "Ambience"], Icon: UsersRound },
];

const photoReveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

const smallPhotos: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.18 } },
};

const copy: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.13 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** A photo in the collage's thin champagne frame. Its parent sets the size. */
function FramedPhoto({ src, alt, sizes, position }: { src: string; alt: string; sizes: string; position?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[0.875rem] border border-[#c9a77a]">
      <Image src={src} alt={alt} fill unoptimized sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
    </div>
  );
}

function CornerFrame() {
  return (
    <svg
      viewBox="0 0 227 525"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute -left-3 -top-3 w-[45%] md:-left-5 md:-top-5 md:w-[59%] lg:-left-[1.75rem] lg:-top-[1.85rem]"
    >
      <path
        d="M2 523V52A50 50 0 0 1 52 2H198C211 2 220 9 225 20"
        stroke="#e8b871"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function CornerSprig() {
  return (
    <svg
      viewBox="40 80 345 395"
      fill="none"
      stroke="#e8b871"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-3 -left-4 w-20 md:-left-8 md:w-24 lg:-bottom-[0.8rem] lg:-left-[2.9rem] lg:w-[6.9rem]"
    >
      <path d="M375 467 255 360 160 245" />
      <path d="M160 245C90 225 55 160 70 90c60 30 115 80 90 155ZM70 90l90 155M118 140l-2 45M118 185l-38-14M136 210l-36 -6M133 205l6-30" />
      <path d="M240 345 222 290C185 240 185 170 232 127c33 43 43 118-10 163ZM232 127l-10 163M226 195l-18-24M224 225l22-34" />
      <path d="M295 360C265 310 280 240 337 212c18 58 3 118-42 148ZM337 212l-42 148 5 40M314 290l-18-30M306 320l24-22" />
      <path d="M250 358 205 345C130 365 85 340 48 280c62-15 122 15 157 65ZM48 280l157 65M112 305l16-14M150 320l-38 8M150 320l18-24" />
    </svg>
  );
}

function Collage() {
  return (
    <div className="relative ml-3 grid grid-cols-2 gap-3 md:ml-5 md:grid-cols-[382fr_279fr] md:gap-5 lg:ml-0 lg:gap-[1.375rem]">
      <motion.div
        variants={photoReveal}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative col-span-2 aspect-[4/5] md:col-span-1 md:aspect-[382/629]"
      >
        <CornerFrame />
        <FramedPhoto
          src="/images/about/chef-plating.webp"
          alt="Chef carefully plating a gourmet dish with tweezers"
          sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 90vw"
          position="50% 62%"
        />
        <CornerSprig />
      </motion.div>

      <motion.div
        variants={smallPhotos}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="col-span-2 flex gap-3 md:col-span-1 md:flex-col md:gap-5 lg:gap-[1.3rem] lg:pb-[1rem] lg:pt-[2.3rem]"
      >
        <motion.div variants={photoReveal} className="relative aspect-square flex-1 md:aspect-auto">
          <FramedPhoto
            src="/images/about/restaurant-interior.webp"
            alt="Candlelit dining table in the warmly lit restaurant"
            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 35vw, 45vw"
          />
        </motion.div>
        <motion.div variants={photoReveal} className="relative aspect-square flex-1 md:aspect-auto">
          <FramedPhoto
            src="/images/about/artisan-coffee.webp"
            alt="Dark cup of coffee with latte art beside fresh pastries"
            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 35vw, 45vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function Features() {
  return (
    <motion.ul
      variants={rise}
      className="mt-8 grid grid-cols-2 gap-y-7 md:grid-cols-[repeat(4,auto)] md:justify-start lg:mt-[2.4rem] lg:grid-cols-[9.7rem_10.5rem_13.7rem_11.5rem] lg:gap-y-0"
    >
      {FEATURES.map(({ lines, Icon }, index) => (
        <li key={lines.join(" ")} className="group relative flex flex-col items-center px-2 text-center md:px-6 lg:px-0">
          {index > 0 && (
            <span
              aria-hidden="true"
              className={`absolute bottom-0 left-0 h-[4.75rem] w-px bg-gold/60 lg:-bottom-[0.25rem] lg:h-[5rem] ${index === 2 ? "hidden md:block" : ""}`}
            />
          )}
          <Icon
            strokeWidth={1.4}
            className="size-10 text-gold transition-transform duration-300 group-hover:-translate-y-1 lg:size-[2.75rem]"
          />
          <span className="mt-3 text-[0.9375rem] leading-[1.35] text-white transition-colors duration-300 group-hover:text-gold-soft lg:mt-[0.7rem] lg:text-[1.1875rem] lg:leading-[1.625rem]">
            {lines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </span>
        </li>
      ))}
    </motion.ul>
  );
}

function Content() {
  return (
    <motion.div variants={copy} initial="hidden" whileInView="show" viewport={VIEWPORT} className="lg:-mt-[0.375rem]">
      <motion.p
        variants={rise}
        className="flex items-center gap-3 text-xs leading-none tracking-[0.34em] text-gold lg:gap-[1.2rem] lg:text-[1.0625rem] lg:tracking-[0.4em]"
      >
        <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[3.4rem]" />
        ABOUT US
        <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[3.4rem]" />
      </motion.p>
      <motion.h2
        id="about-heading"
        variants={rise}
        className="mt-4 font-display text-[8.6vw] font-normal leading-[1.14] text-white md:text-[3.5rem] lg:mt-[2.2rem] lg:text-[4.05rem] lg:leading-[4.4rem]"
      >
        <span className="block">Where Great Food</span>
        <span>Meets </span>
        <em className="whitespace-nowrap text-gold">Warm Hospitality</em>
      </motion.h2>
      <motion.p
        variants={rise}
        className="mt-5 max-w-[43.75rem] text-base leading-[1.65] text-mist lg:mt-[1.2rem] lg:text-[1.34rem] lg:leading-[2.05rem]"
      >
        At The Grove, we bring together exceptional cuisine, artisanal coffee, and a cozy, elegant ambience to create
        unforgettable dining moments for every guest.
      </motion.p>
      <Features />
      <motion.div variants={rise} className="mt-9 lg:mt-[3.3rem]">
        <a
          href="#our-story"
          className="bg-champagne group flex h-14 items-center justify-center gap-4 rounded-full text-lg text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-100 md:inline-flex md:w-56 lg:h-[4.0625rem] lg:w-[13.875rem] lg:gap-[1.15rem] lg:text-[1.3125rem]"
        >
          Our Story
          <ArrowRight
            strokeWidth={1.5}
            className="size-6 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.6rem]"
          />
        </a>
      </motion.div>
    </motion.div>
  );
}

const LEAF = "M0 0C30-30 95-34 150 0C95 28 30 28 0 0Z";

const SPRIGS = [
  {
    viewBox: "0 0 360 270",
    className: "left-0 top-0 w-[46vw] md:w-[22.5rem]",
    leaves: [
      "translate(90 18) rotate(10) scale(1.7)",
      "translate(10 125) rotate(-12) scale(1.3)",
      "translate(-18 250) rotate(-42) scale(1)",
      "translate(0 40) rotate(-8) scale(.9)",
    ],
  },
  {
    viewBox: "0 0 255 195",
    className: "right-0 top-0 w-[38vw] md:w-[16rem]",
    leaves: [
      "translate(5 60) rotate(-22) scale(1.15)",
      "translate(62 190) rotate(-52) scale(1.05)",
      "translate(205 190) rotate(-78) scale(.8)",
    ],
  },
  {
    viewBox: "0 0 290 235",
    className: "bottom-0 right-0 w-[40vw] md:w-[18rem]",
    leaves: [
      "translate(5 100) rotate(8) scale(1.3)",
      "translate(245 105) rotate(-105) scale(.68)",
      "translate(95 220) rotate(-40) scale(.68)",
      "translate(190 220) rotate(-58) scale(.62)",
    ],
  },
];

/** Soft out-of-focus foliage, the quiet gold arc and the warm glow behind the section. */
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SPRIGS.map(({ viewBox, className, leaves }) => (
        <svg key={viewBox} viewBox={viewBox} fill="#21170b" className={`absolute ${className}`}>
          {leaves.map((transform) => (
            <path key={transform} d={LEAF} transform={transform} />
          ))}
        </svg>
      ))}
      <svg viewBox="0 0 810 58" className="absolute bottom-0 left-1/2 w-[110vw] -translate-x-1/2 md:w-[50.6rem]">
        <defs>
          <linearGradient id="about-arc-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#e8b871" stopOpacity="0" />
            <stop offset="0.5" stopColor="#e8b871" stopOpacity="0.4" />
            <stop offset="1" stopColor="#e8b871" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="about-arc-glow" cx="0.5" cy="1" r="0.5" gradientTransform="matrix(1 0 0 1.6 0 -0.6)">
            <stop offset="0" stopColor="#e8b871" stopOpacity="0.22" />
            <stop offset="1" stopColor="#e8b871" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M0 57C180 20 290 1 405 1C520 1 640 20 810 57Z" fill="url(#about-arc-glow)" />
        <path d="M0 57C180 20 290 1 405 1C520 1 640 20 810 57" fill="none" stroke="url(#about-arc-line)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

export default function AboutSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="our-story"
        aria-labelledby="about-heading"
        className="relative overflow-hidden bg-[#0f0b06]"
      >
        <Backdrop />
        <div className="relative mx-auto grid max-w-[104.5rem] gap-12 px-6 pb-24 pt-20 md:gap-14 md:px-10 md:pb-28 md:pt-24 lg:grid-cols-[36rem_1fr] lg:items-start lg:gap-[3rem] lg:pb-[9.875rem] lg:pl-[4rem] lg:pr-[2rem] lg:pt-[9.625rem] min-[73.75rem]:grid-cols-[42.6875rem_1fr] min-[73.75rem]:gap-[4.8125rem] min-[73.75rem]:pl-[7.625rem] min-[73.75rem]:pr-[3rem]">
          <Collage />
          <Content />
        </div>
      </section>
    </MotionConfig>
  );
}
