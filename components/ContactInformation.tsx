"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { mailHref, mapPlaceUrl, RESTAURANT, telHref } from "@/config/restaurant";

const EASE = [0.22, 1, 0.36, 1] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.14 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const icon: Variants = {
  hidden: { scale: 0.75 },
  show: { scale: 1, transition: { duration: 0.75, ease: EASE } },
};

const divider: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};

const LINK = "transition-colors duration-300 hover:text-gold-soft focus-visible:text-gold-soft";

function ContactItem({
  Icon,
  title,
  className,
  children,
  last,
}: {
  Icon: LucideIcon;
  title: string;
  className: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <motion.li variants={row} className={`relative flex items-center gap-4 py-4 lg:gap-[1.875rem] lg:px-[1.375rem] lg:py-0 ${className}`}>
      <motion.span variants={icon} className="flex shrink-0 self-start lg:self-center">
        <Icon aria-hidden="true" strokeWidth={1.4} className="size-7 text-gold lg:size-[2.3rem]" />
      </motion.span>
      <div className="min-w-0 flex-1">
        <h3 className="text-[1.125rem] font-normal leading-tight text-white lg:text-[1.35rem]">{title}</h3>
        <div className="mt-1.5 text-[0.9375rem] leading-[1.5] text-[#ece7dc] lg:mt-[0.4rem] lg:text-[1.1rem] lg:leading-[1.8rem]">
          {children}
        </div>
      </div>
      {!last && (
        <motion.span
          variants={divider}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold/45"
        />
      )}
    </motion.li>
  );
}

export default function ContactInformation({ animate }: { animate: "hidden" | "show" }) {
  return (
    <motion.ul
      variants={list}
      initial="hidden"
      animate={animate}
      className="flex h-full flex-col px-5 py-2 lg:px-[1.875rem] lg:py-0"
    >
      <ContactItem Icon={MapPin} title="Our Location" className="lg:min-h-[8.125rem]">
        <a
          href={mapPlaceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${RESTAURANT.addressLines.join(" ")} (opens Google Maps in a new tab)`}
          className={LINK}
        >
          {RESTAURANT.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </a>
      </ContactItem>

      <ContactItem Icon={Phone} title="Call Us" className="lg:min-h-[5.875rem]">
        <a href={telHref} className={`${LINK} inline-flex min-h-6 items-center`}>
          {RESTAURANT.phone}
        </a>
      </ContactItem>

      <ContactItem Icon={Mail} title="Email Us" className="lg:min-h-[5.875rem]">
        <a href={mailHref} className={`${LINK} inline-flex min-h-6 items-center break-all`}>
          {RESTAURANT.email}
        </a>
      </ContactItem>

      <ContactItem Icon={Clock} title="Opening Hours" className="lg:flex-1" last>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 lg:gap-x-[2.25rem] lg:leading-[1.95rem]">
          {RESTAURANT.openingHours.map(({ days, hours }) => (
            <div key={days} className="contents">
              <dt className="whitespace-nowrap">{days}</dt>
              <dd className="relative whitespace-nowrap max-[359px]:text-sm">
                <span aria-hidden="true" className="absolute -left-2.5 lg:-left-[1.1rem]">
                  :
                </span>
                {hours}
              </dd>
            </div>
          ))}
        </dl>
      </ContactItem>
    </motion.ul>
  );
}
