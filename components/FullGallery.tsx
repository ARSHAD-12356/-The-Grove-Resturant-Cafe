"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, MotionConfig, type Variants } from "framer-motion";
import { ArrowLeft, Maximize2 } from "lucide-react";
import GalleryFilters from "./GalleryFilters";
import GalleryLightbox from "./GalleryLightbox";
import { FULL_GALLERY_ITEMS } from "@/data/fullGalleryItems";
import { CATEGORY_LABELS, type GalleryCategoryId, type GalleryItem } from "@/data/galleryItems";

const EASE = [0.22, 1, 0.36, 1] as const;

const heroSequence: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.16 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

function MasonryTile({ item, index, onOpen }: { item: GalleryItem; index: number; onOpen: () => void }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 34, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.85, delay: (index % 4) * 0.07, ease: EASE }}
      className="mb-3 break-inside-avoid md:mb-4 lg:mb-[1.025rem]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${item.title} full screen`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[0.875rem] border border-[#c9a77a] transition-[border-color,box-shadow] duration-500 hover:border-gold hover:shadow-[0_0_1.25rem_rgb(232_184_113/0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          unoptimized
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-[#1c1104]/85 via-transparent to-transparent p-2.5 text-left transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100 lg:p-[0.9rem] [@media(hover:hover)]:opacity-0">
          <span className="min-w-0">
            <span className="block text-[0.8125rem] leading-tight text-white lg:text-[1.1rem]">{item.title}</span>
            <span className="mt-0.5 block text-[0.6875rem] leading-tight text-gold-soft lg:text-[0.875rem]">
              {CATEGORY_LABELS[item.category]}
            </span>
          </span>
          <span className="hidden size-[2.25rem] shrink-0 items-center justify-center rounded-full border border-gold-soft bg-ink/40 text-gold-soft [@media(hover:hover)]:flex">
            <Maximize2 aria-hidden="true" strokeWidth={1.5} className="size-[1.05rem]" />
          </span>
        </span>
      </button>
    </motion.li>
  );
}

export default function FullGallery() {
  const [category, setCategory] = useState<GalleryCategoryId>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const items = useMemo(
    () => (category === "all" ? FULL_GALLERY_ITEMS : FULL_GALLERY_ITEMS.filter((item) => item.category === category)),
    [category],
  );

  const selectCategory = (next: GalleryCategoryId) => {
    setCategory(next);
    // Someone deep in the photos should see the new category from its first row.
    const grid = gridRef.current;
    if (grid && grid.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - 90, behavior: "instant" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-svh bg-[#100c07]">
        <header className="relative flex min-h-[21rem] flex-col justify-end overflow-hidden px-6 pb-9 pt-20 text-center md:min-h-[24rem] md:px-10 lg:min-h-[23.5rem] lg:pb-[2.75rem]">
          <motion.div
            aria-hidden="true"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image src="/images/hero-bg.webp" alt="" fill priority unoptimized sizes="100vw" className="object-cover" />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(16_12_7/0.75),rgb(16_12_7/0.72)_55%,#100c07)]"
          />

          <Link
            href="/#gallery"
            className="absolute left-5 top-5 z-10 inline-flex min-h-11 items-center gap-2 text-gold-soft transition-colors duration-300 hover:text-white md:left-10 lg:left-[2.75rem] lg:top-[1.5rem] lg:text-[1.05rem]"
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
            Back to The Grove
          </Link>

          <motion.div
            variants={heroSequence}
            initial="hidden"
            animate="show"
            className="relative flex flex-col items-center"
          >
            <motion.p
              variants={rise}
              className="flex items-center gap-3 text-xs leading-none tracking-[0.34em] text-gold lg:gap-[1.5rem] lg:text-[1.125rem] lg:tracking-[0.335em]"
            >
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4rem]" />
              THE FULL GALLERY
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4rem]" />
            </motion.p>
            <motion.h1
              variants={rise}
              className="mt-3 font-display text-[11vw] font-normal leading-[1.1] text-white md:text-[4rem] lg:mt-[1rem] lg:text-[5rem]"
            >
              Every Corner of <em className="block text-gold md:inline">The Grove</em>
            </motion.h1>
            <motion.p
              variants={rise}
              className="mt-3 max-w-[36rem] text-[0.9375rem] leading-[1.6] text-[#d8d3c9] lg:mt-[0.9rem] lg:max-w-[46rem] lg:text-[1.3rem] lg:leading-[1.875rem]"
            >
              Dishes, drinks, dining rooms and the hands behind them, all in one place.
            </motion.p>
          </motion.div>
        </header>

        <div className="sticky top-0 z-20 border-b border-gold/15 bg-[#100c07] px-6 py-2 md:px-10 lg:py-[0.75rem]">
          <GalleryFilters active={category} onSelect={selectCategory} animate="show" />
        </div>

        <div ref={gridRef} className="mx-auto max-w-[104.5rem] px-3 pb-14 pt-5 md:px-10 md:pb-20 md:pt-8 lg:px-[2.75rem] lg:pt-[2rem]">
          <p aria-live="polite" className="mb-4 text-center text-sm text-mist lg:mb-[1.5rem] lg:text-[1.05rem]">
            {items.length} photos
          </p>
          <AnimatePresence mode="wait">
            <motion.ul
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4 lg:gap-[1.025rem]"
            >
              {items.map((item, index) => (
                <MasonryTile key={item.id} item={item} index={index} onOpen={() => setOpenIndex(index)} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <GalleryLightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      </main>
    </MotionConfig>
  );
}
