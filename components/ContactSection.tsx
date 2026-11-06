"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, MotionConfig, useInView, type Variants } from "framer-motion";
import { ArrowRight, Navigation } from "lucide-react";
import BlogBackdrop from "./BlogBackdrop";
import ContactInformation from "./ContactInformation";
import RestaurantMap from "./RestaurantMap";
import SocialContactBar from "./SocialContactBar";
import { mapDirectionsUrl, RESTAURANT } from "@/config/restaurant";

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

const photoReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { opacity: { duration: 0.9, ease: "easeIn" }, scale: { duration: 1.4, ease: EASE } },
  },
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const animate = inView ? "show" : "hidden";

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="contact"
        aria-labelledby="contact-heading"
        className="relative overflow-hidden bg-[#120d06]"
      >
        <BlogBackdrop />
        <div className="relative mx-auto max-w-[104.5rem] px-6 pb-10 pt-14 md:px-10 md:pt-16 lg:px-0 lg:pb-[1.75rem] lg:pt-[2rem]">
          <motion.div variants={sequence} initial="hidden" animate={animate} className="flex flex-col items-center text-center lg:px-[3rem]">
            <motion.p
              variants={fade}
              className="flex items-center gap-3 text-xs leading-none tracking-[0.34em] text-gold lg:gap-[1.2rem] lg:text-[1.2rem] lg:tracking-[0.2em]"
            >
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[6.8rem]" />
              GET IN TOUCH
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[6.8rem]" />
            </motion.p>
            <motion.h2
              id="contact-heading"
              variants={rise}
              className="mt-3 font-display text-[10.4vw] font-normal leading-[1.14] text-white md:text-[3.5rem] lg:mt-[1rem] lg:text-[4.31rem] lg:leading-[4.5rem]"
            >
              We&rsquo;d Love to <em className="block whitespace-nowrap text-gold md:inline">Welcome You</em>
            </motion.h2>
            <motion.p
              variants={fade}
              className="mt-3 max-w-[34rem] text-[0.9375rem] leading-[1.6] text-[#ece7dc] md:max-w-[42rem] lg:mt-[1.06rem] lg:max-w-none lg:text-[1.277rem] lg:leading-[1.875rem]"
            >
              Have a question, a special request, or ready to visit? We&rsquo;re here to help and would be delighted to
              host you at The Grove.
            </motion.p>
          </motion.div>

          <div className="mt-8 grid gap-5 lg:mt-[2.85rem] lg:grid-cols-[774fr_744fr] lg:gap-[1.5625rem] lg:pl-[4.25rem] lg:pr-[3.75rem]">
            <motion.article
              variants={rise}
              initial="hidden"
              animate={animate}
              className="group flex flex-col overflow-hidden rounded-[1.25rem] border border-[#d4b283]/75 bg-[#160f07] md:flex-row lg:min-h-[30.44rem] lg:rounded-[1.4rem]"
            >
              <div className="relative aspect-[5/6] shrink-0 overflow-hidden md:aspect-auto md:w-[36.5%]">
                <motion.div variants={photoReveal} className="absolute inset-0">
                  <Image
                    src="/images/contact/restaurant-contact.webp"
                    alt="Pink flowers in a vase beside wine glasses on a warmly lit table"
                    fill
                    unoptimized
                    loading="eager"
                    sizes="(min-width: 768px) 20vw, 100vw"
                    className="object-cover object-[50%_55%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </motion.div>
              </div>
              <div className="min-w-0 flex-1">
                <ContactInformation animate={animate} />
              </div>
            </motion.article>

            <motion.div
              variants={rise}
              initial="hidden"
              animate={animate}
              className="flex flex-col rounded-[1.25rem] border border-[#d4b283]/75 bg-[#160f07] p-3 md:p-4 lg:rounded-[1.4rem] lg:p-[1.5rem]"
            >
              <div className="min-h-0 flex-1">
                <RestaurantMap />
              </div>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions (opens Google Maps in a new tab)"
                className="bg-champagne group mt-3 flex h-14 w-full items-center justify-center gap-3 self-center rounded-full text-lg font-medium text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-100 md:mt-4 md:w-auto md:px-10 lg:mt-[1.4rem] lg:h-[3.44rem] lg:w-[20.6rem] lg:gap-[0.85rem] lg:px-0 lg:text-[1.35rem]"
              >
                <Navigation aria-hidden="true" strokeWidth={1.6} className="size-5 fill-ink lg:size-[1.4rem]" />
                Get Directions
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.4rem]"
                />
              </a>
            </motion.div>
          </div>

          <div className="mt-7 lg:mt-[2.75rem]">
            <SocialContactBar animate={animate} />
          </div>

          {RESTAURANT.isDemoData && (
            <p className="mt-4 text-center text-xs text-mist lg:mt-[0.5rem] lg:text-[0.875rem]">
              Sample contact details shown for preview. Please confirm before visiting.
            </p>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
