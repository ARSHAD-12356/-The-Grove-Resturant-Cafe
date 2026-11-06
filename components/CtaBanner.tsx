"use client";

import { motion, MotionConfig } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { GroveMark } from "./GroveMark";

export default function CtaBanner() {
  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="cta-heading" className="bg-[#120d06] px-6 pb-12 pt-2 md:px-10 lg:px-[4.25rem] lg:pb-[3.5rem] lg:pt-[0.5rem]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex max-w-[97rem] flex-col items-center gap-5 overflow-hidden rounded-[1.25rem] border border-[#d4b283]/75 bg-[linear-gradient(100deg,#2f1f0c_0%,#1a1208_45%,#2f1f0c_100%)] px-5 py-8 text-center lg:flex-row lg:justify-between lg:gap-[2rem] lg:rounded-[1.4rem] lg:px-[3rem] lg:py-[2rem] lg:text-left"
        >
          <GroveMark
            className="pointer-events-none absolute -right-4 -top-6 h-40 w-auto text-gold/10 lg:left-1/2 lg:right-auto lg:top-1/2 lg:h-[12rem] lg:-translate-y-1/2"
          />
          <div className="relative">
            <h2 id="cta-heading" className="font-display text-[2.125rem] font-normal leading-[1.14] text-white lg:text-[3rem]">
              Your Table <em className="whitespace-nowrap text-gold">Is Waiting</em>
            </h2>
            <p className="mt-1.5 text-[0.9375rem] leading-normal text-[#ece7dc] lg:mt-[0.4rem] lg:text-[1.25rem]">
              Reserve your evening and let us take care of the rest.
            </p>
          </div>
          <a
            href="#reservations"
            className="bg-champagne group relative flex h-14 w-full shrink-0 items-center justify-center gap-3 rounded-full text-lg font-medium text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-100 md:w-auto md:px-10 lg:h-[3.75rem] lg:gap-[0.8rem] lg:px-[2.5rem] lg:text-[1.3rem]"
          >
            <CalendarDays aria-hidden="true" strokeWidth={1.5} className="size-5 lg:size-[1.5rem]" />
            Book a Table
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.5rem]"
            />
          </a>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
