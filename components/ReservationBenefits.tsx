"use client";

import { motion, type Variants } from "framer-motion";
import { CalendarCheck, ConciergeBell, ShieldCheck, type LucideIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** "Booking Updates" stands in for "Instant Confirmation" until a real booking service can back that promise. */
const BENEFITS: { title: string; subtitle: string; Icon: LucideIcon }[] = [
  { title: "Easy Booking", subtitle: "Quick & Hassle-Free", Icon: CalendarCheck },
  { title: "Booking Updates", subtitle: "Stay Informed", Icon: ConciergeBell },
  { title: "Secure & Reliable", subtitle: "Your Data is Safe", Icon: ShieldCheck },
];

const list: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.14 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function ReservationBenefits({ animate }: { animate: "hidden" | "show" }) {
  return (
    <motion.ul
      variants={list}
      initial="hidden"
      animate={animate}
      className="grid gap-5 md:grid-cols-3 md:gap-0 min-[73.75rem]:-ml-[1.44rem] lg:grid-cols-[18.625rem_21.5625rem_minmax(0,1fr)]"
    >
      {BENEFITS.map(({ title, subtitle, Icon }) => (
        <motion.li
          key={title}
          variants={item}
          className="group flex items-center gap-4 md:justify-center md:border-l md:border-gold/45 md:px-3 md:first:border-l-0 lg:h-[3.875rem] lg:justify-start lg:gap-[1.25rem] lg:px-0 lg:pl-[2.45rem] lg:first:border-l"
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.3}
            className="size-10 shrink-0 text-gold-soft transition-transform duration-300 group-hover:scale-105 lg:size-[3.5rem]"
          />
          <span className="flex min-w-0 flex-col">
            <span className="text-[1.0625rem] leading-tight text-white md:text-base lg:text-[1.3rem]">{title}</span>
            <span className="mt-1 text-sm leading-tight text-[#d0cabf] lg:mt-[0.45rem] lg:text-[1.08rem]">{subtitle}</span>
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
