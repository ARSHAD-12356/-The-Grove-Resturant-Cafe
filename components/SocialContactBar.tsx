"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WhatsappIcon } from "./BrandIcons";
import SocialLink, { SOCIALS } from "./SocialLink";
import { whatsappHref } from "@/config/restaurant";

const EASE = [0.22, 1, 0.36, 1] as const;

const bar: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const CIRCLE =
  "flex size-12 items-center justify-center rounded-full border border-gold-soft/80 text-gold-soft lg:size-[3.7rem]";
const LINE = "absolute inset-x-0 h-px bg-[linear-gradient(to_right,transparent,rgb(232_184_113/0.6)_15%,rgb(232_184_113/0.6)_85%,transparent)]";

export default function SocialContactBar({ animate }: { animate: "hidden" | "show" }) {
  return (
    <motion.div
      variants={bar}
      initial="hidden"
      animate={animate}
      className="relative grid justify-items-center gap-6 py-7 lg:mx-[9.4rem] lg:h-[7.69rem] lg:grid-cols-[362fr_503fr_495fr] lg:items-center lg:justify-items-start lg:gap-0 lg:py-0"
    >
      <span aria-hidden="true" className={`${LINE} top-0`} />
      <span aria-hidden="true" className={`${LINE} bottom-0`} />

      <motion.h3
        variants={rise}
        className="font-display text-[1.875rem] font-normal italic leading-none text-white lg:pl-[1.875rem] lg:text-[2.43rem]"
      >
        Connect With Us
      </motion.h3>

      <motion.ul
        variants={rise}
        aria-label="Social media"
        className="flex items-center gap-4 lg:h-[3.5rem] lg:w-full lg:gap-[1.85rem] lg:border-x lg:border-gold/50 lg:pl-[5rem]"
      >
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <SocialLink social={social} className={CIRCLE} iconClassName="size-6 lg:size-[1.8rem]" />
          </li>
        ))}
      </motion.ul>

      <motion.div variants={rise} className="lg:justify-self-end lg:pr-[2.5rem]">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp (opens in a new tab)"
          className="group flex h-14 items-center justify-center gap-3 rounded-full border-2 border-gold/80 px-6 text-[1.0625rem] text-gold-soft transition-[border-color,box-shadow] duration-300 hover:border-gold-soft hover:shadow-[0_0_1rem_rgb(244_205_142/0.25)] lg:h-[4.1rem] lg:w-[23.4rem] lg:gap-[1rem] lg:px-0 lg:text-[1.4rem]"
        >
          <WhatsappIcon className="size-6 lg:size-[2.4rem]" />
          Chat on WhatsApp
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.5rem]"
          />
        </a>
      </motion.div>
    </motion.div>
  );
}
