"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useInView, type Variants } from "framer-motion";
import { ArrowRight, CakeSlice, ConciergeBell, Coffee, Leaf, Utensils, type LucideIcon } from "lucide-react";
import MenuCard from "./MenuCard";
import { useDragRail } from "./useDragRail";
import { getMenuItems, MENU_CATEGORIES, type MenuCategoryId } from "@/data/menuItems";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORY_ICONS: Record<MenuCategoryId, LucideIcon> = {
  all: ConciergeBell,
  "main-course": Utensils,
  "cafe-beverages": Coffee,
  desserts: CakeSlice,
  starters: Leaf,
};

const sequence: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const tabList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const tabItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const cardList: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.05, staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
};

function CategoryTabs({ active, onSelect }: { active: MenuCategoryId; onSelect: (id: MenuCategoryId) => void }) {
  return (
    <motion.ul
      variants={tabList}
      aria-label="Menu categories"
      className="no-scrollbar mt-8 flex items-center overflow-x-auto px-5 py-1 lg:mt-[2.5rem] lg:justify-center lg:overflow-visible lg:px-0 lg:pl-[1.25rem]"
    >
      {MENU_CATEGORIES.map(({ id, label }, index) => {
        const Icon = CATEGORY_ICONS[id];
        const isActive = active === id;
        return (
          <motion.li
            key={id}
            variants={tabItem}
            className={`relative shrink-0 lg:px-[0.9rem] ${index === 0 ? "lg:pl-0 lg:pr-[1.8rem]" : ""}`}
          >
            {index > 0 && (
              <span aria-hidden="true" className="absolute inset-y-[0.1rem] left-0 hidden w-px bg-gold/50 lg:block" />
            )}
            <button
              type="button"
              aria-pressed={isActive}
              onClick={(event) => {
                onSelect(id);
                event.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              className={`group relative flex h-12 items-center gap-2.5 rounded-full px-4 text-[0.9375rem] whitespace-nowrap transition-colors duration-300 lg:h-[3.875rem] lg:gap-[1rem] lg:text-[1.2rem] ${
                index === 0 ? "lg:px-[2.3rem]" : "lg:px-[2.4rem]"
              } ${isActive ? "font-medium text-ink" : "text-white hover:text-gold-soft"}`}
            >
              {isActive && (
                <motion.span
                  layoutId="menu-active-pill"
                  transition={{ type: "spring", stiffness: 320, damping: 34 }}
                  className="bg-champagne absolute inset-0 rounded-full"
                />
              )}
              <Icon
                strokeWidth={1.3}
                aria-hidden="true"
                className={`relative size-6 transition-transform duration-300 group-hover:-translate-y-0.5 lg:size-[2.5rem] ${
                  isActive ? "text-ink" : "text-gold"
                }`}
              />
              <span className="relative">{label}</span>
            </button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

const LEAF =
  "M0 0C30-30 95-34 150 0C95 28 30 28 0 0Z";

const SPRIGS = [
  {
    viewBox: "0 0 320 270",
    className: "left-0 top-0 w-[42vw] md:w-[20rem]",
    leaves: [
      "translate(95 75) rotate(32) scale(.95)",
      "translate(30 115) rotate(35) scale(.72)",
      "translate(10 175) rotate(58) scale(.62)",
      "translate(30 45) rotate(-68) scale(.5)",
      "translate(190 28) rotate(-16) scale(.8)",
    ],
  },
  {
    viewBox: "0 0 270 190",
    className: "right-0 top-0 w-[36vw] md:w-[17rem]",
    leaves: [
      "translate(5 52) rotate(-14) scale(.85)",
      "translate(70 180) rotate(-52) scale(.92)",
      "translate(225 170) rotate(-78) scale(.72)",
      "translate(170 20) rotate(8) scale(.6)",
    ],
  },
  {
    viewBox: "0 0 280 130",
    className: "bottom-0 right-0 w-[36vw] md:w-[17.5rem]",
    leaves: [
      "translate(5 90) rotate(-8) scale(.95)",
      "translate(140 125) rotate(-34) scale(.7)",
      "translate(245 90) rotate(-100) scale(.5)",
    ],
  },
];

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SPRIGS.map(({ viewBox, className, leaves }) => (
        <svg key={viewBox} viewBox={viewBox} fill="#261a0c" className={`absolute ${className}`}>
          {leaves.map((transform) => (
            <path key={transform} d={LEAF} transform={transform} />
          ))}
        </svg>
      ))}
    </div>
  );
}

export default function MenuSection() {
  const [category, setCategory] = useState<MenuCategoryId>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const { railHandlers, reset } = useDragRail(railRef);
  const items = useMemo(() => getMenuItems(category), [category]);
  const animateTo = inView ? "show" : "hidden";

  const selectCategory = (next: MenuCategoryId) => {
    if (next === category) return;
    setCategory(next);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="menu"
        aria-labelledby="menu-heading"
        className="relative overflow-hidden bg-[#0f0b06] pb-12 pt-14 lg:pb-[2.5rem] lg:pt-[3.1rem]"
      >
        <Backdrop />

        <motion.div variants={sequence} initial="hidden" animate={animateTo} className="relative">
          <div className="flex flex-col items-center px-5 text-center">
            <motion.p
              variants={rise}
              className="flex items-center gap-3 text-xs leading-none tracking-[0.42em] text-gold lg:gap-[1.4rem] lg:text-[1.125rem] lg:tracking-[0.45em]"
            >
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4.9rem]" />
              OUR MENU
              <span aria-hidden="true" className="h-px w-9 bg-gold-muted lg:w-[4.9rem]" />
            </motion.p>
            <motion.h2
              id="menu-heading"
              variants={rise}
              className="mt-3 font-display text-[9.2vw] font-normal leading-[1.14] text-white md:text-[3.25rem] lg:mt-[1.45rem] lg:text-[4.14rem] lg:leading-[4.5rem]"
            >
              Discover Our{" "}
              <em className="block whitespace-nowrap text-gold md:inline">Signature Dishes</em>
            </motion.h2>
            <motion.p
              variants={rise}
              className="mt-3 max-w-[29rem] text-[0.9375rem] leading-[1.6] text-[#b8b2a7] lg:mt-[0.65rem] lg:max-w-[46rem] lg:text-[1.36rem] lg:leading-[2rem]"
            >
              A curated selection of our most loved dishes, crafted with the finest ingredients and a passion for great
              food.
            </motion.p>
          </div>

          <CategoryTabs active={category} onSelect={selectCategory} />

          <div className="relative mt-5 lg:mt-[2.5rem]">
            <div
              ref={railRef}
              {...railHandlers}
              className="no-scrollbar cursor-grab select-none overflow-x-auto [overscroll-behavior-x:contain] active:cursor-grabbing [@media(hover:none)]:snap-x [@media(hover:none)]:snap-mandatory"
            >
              <AnimatePresence mode="wait" initial={false} onExitComplete={reset}>
                <motion.ul
                  key={category}
                  variants={cardList}
                  initial="hidden"
                  animate={animateTo}
                  exit="exit"
                  className="flex w-max gap-4 px-5 py-2 md:px-10 lg:gap-[1.5rem] lg:px-[3rem] lg:py-[0.6rem]"
                >
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={cardItem}
                      className="w-[82vw] max-w-[20rem] shrink-0 snap-center lg:h-[24.625rem] lg:w-[23.5625rem] lg:max-w-none"
                    >
                      <MenuCard item={item} />
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-[2.5rem] bg-gradient-to-r from-[#0f0b06] lg:block" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[2.5rem] bg-gradient-to-l from-[#0f0b06] lg:block" />
          </div>

          <motion.div variants={rise} className="mt-7 flex justify-center px-5 lg:mt-[2.25rem]">
            <a
              href="#menu"
              onClick={() => setCategory("all")}
              className="bg-champagne group inline-flex h-14 items-center gap-3 rounded-full px-9 text-lg font-medium text-ink transition-[transform,filter] duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-100 lg:h-[3.9375rem] lg:w-[16.4375rem] lg:justify-center lg:gap-[0.8rem] lg:px-0 lg:text-[1.3rem]"
            >
              View Full Menu
              <ArrowRight
                strokeWidth={1.5}
                className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.5rem]"
              />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
