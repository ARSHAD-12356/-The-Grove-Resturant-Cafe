"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, MotionConfig, useInView, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BlogBackdrop from "./BlogBackdrop";
import BlogCarousel from "./BlogCarousel";

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

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const animate = inView ? "show" : "hidden";

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="blog"
        aria-labelledby="blog-heading"
        className="relative overflow-hidden bg-[#120d06]"
      >
        <BlogBackdrop />
        <div className="relative mx-auto max-w-[104.5rem] px-6 pb-14 pt-14 md:px-10 md:pb-16 md:pt-16 lg:px-[5.5625rem] lg:pb-[3rem] lg:pt-[2rem]">
          <motion.div variants={sequence} initial="hidden" animate={animate} className="flex flex-col items-center text-center">
            <motion.p
              variants={fade}
              className="flex items-center gap-3 text-xs leading-none tracking-[0.34em] text-gold lg:gap-[1.4rem] lg:text-[1.2rem] lg:tracking-[0.25em]"
            >
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[7.6rem]" />
              OUR BLOG
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[7.6rem]" />
            </motion.p>
            <motion.h2
              id="blog-heading"
              variants={rise}
              className="mt-3 font-display text-[10.4vw] font-normal leading-[1.14] text-white md:text-[3.5rem] lg:mt-[1.1rem] lg:text-[4.5rem] lg:leading-[4.5rem]"
            >
              Stories from <em className="block whitespace-nowrap text-gold md:inline">The Grove</em>
            </motion.h2>
            <motion.p
              variants={fade}
              className="mt-3 max-w-[32rem] text-[0.9375rem] leading-[1.6] text-[#e4dfd5] md:max-w-[42rem] lg:mt-[1.05rem] lg:max-w-none lg:text-[1.328rem] lg:leading-[1.875rem]"
            >
              Dining tips, culinary stories, seasonal specials, and a behind-the-scenes look at life at The Grove.
            </motion.p>
          </motion.div>

          <BlogCarousel animate={animate} />

          <motion.div variants={rise} initial="hidden" animate={animate} className="mt-3 flex justify-center md:mt-8 lg:mt-[2.75rem]">
            <Link
              href="/blog"
              className="bg-champagne group flex h-14 w-full items-center justify-center gap-3 rounded-full text-lg font-medium text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-100 md:w-auto md:px-10 lg:h-[4.0625rem] lg:w-[20.6875rem] lg:gap-[0.9rem] lg:px-0 lg:text-[1.45rem]"
            >
              View All Articles
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.5rem]"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
