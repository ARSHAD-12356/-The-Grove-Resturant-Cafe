"use client";

import { motion, type Variants } from "framer-motion";
import { Armchair, ChefHat, LayoutGrid, Utensils, Wine, type LucideIcon } from "lucide-react";
import { GALLERY_CATEGORIES, type GalleryCategoryId } from "@/data/galleryItems";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORY_ICONS: Record<GalleryCategoryId, LucideIcon> = {
  all: LayoutGrid,
  food: Utensils,
  beverages: Wine,
  ambience: Armchair,
  "behind-the-scenes": ChefHat,
};

const tabList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const tabItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function GalleryFilters({
  active,
  onSelect,
  animate,
}: {
  active: GalleryCategoryId;
  onSelect: (category: GalleryCategoryId) => void;
  animate: "hidden" | "show";
}) {
  return (
    <motion.ul
      variants={tabList}
      initial="hidden"
      animate={animate}
      aria-label="Gallery categories"
      className="no-scrollbar -mx-6 flex items-center overflow-x-auto px-5 py-1 md:-mx-10 md:justify-center md:px-10 lg:mx-0 lg:overflow-visible lg:px-0"
    >
      {GALLERY_CATEGORIES.map(({ id, label }, index) => {
        const Icon = CATEGORY_ICONS[id];
        const isActive = active === id;
        const isFirst = index === 0;
        const isLast = index === GALLERY_CATEGORIES.length - 1;
        return (
          <motion.li
            key={id}
            variants={tabItem}
            className={`relative shrink-0 lg:px-[1.7rem] ${isFirst ? "lg:pl-0" : ""} ${isLast ? "lg:pr-0" : ""}`}
          >
            {!isFirst && (
              <span aria-hidden="true" className="absolute inset-y-[0.4rem] left-0 hidden w-px bg-gold/50 lg:block" />
            )}
            <button
              type="button"
              aria-pressed={isActive}
              onClick={(event) => {
                onSelect(id);
                event.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              className={`group relative flex h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] whitespace-nowrap transition-colors duration-300 lg:h-[3.125rem] lg:gap-[0.85rem] lg:text-[1.14rem] ${
                isFirst ? "lg:px-[1.875rem]" : "lg:px-[1.4rem]"
              } ${isActive ? "font-medium text-ink" : "text-white hover:text-gold-soft"}`}
            >
              {isActive && (
                <motion.span
                  layoutId="gallery-active-pill"
                  transition={{ type: "spring", stiffness: 320, damping: 34 }}
                  className="bg-champagne absolute inset-0 rounded-full"
                />
              )}
              <Icon
                aria-hidden="true"
                strokeWidth={1.4}
                className={`relative size-5 lg:size-[2rem] ${isActive ? "text-ink" : "text-gold"}`}
              />
              <span className="relative">{label}</span>
            </button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
