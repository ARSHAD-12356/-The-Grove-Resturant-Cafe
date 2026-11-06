"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { CATEGORY_LABELS, type GalleryItem } from "@/data/galleryItems";

const EASE = [0.22, 1, 0.36, 1] as const;

const gridReveal: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const tileReveal: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
};

/**
 * Where each photo sits in the full mosaic. Six desktop tracks let the two rows break at
 * different points, which is what gives the reference its uneven rhythm.
 */
const MOSAIC_PLACEMENT: Record<string, string> = {
  "restaurant-interior-01":
    "col-start-1 row-start-1 row-span-2 md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1",
  "grilled-salmon": "col-start-2 row-start-1 aspect-[5/4] md:col-start-2 md:row-start-1 md:aspect-auto lg:col-[2/4]",
  "artisan-cappuccino": "col-start-2 row-start-2 aspect-[5/4] md:col-start-3 md:row-start-1 md:aspect-auto lg:col-start-4",
  "chef-plating":
    "col-span-2 row-start-3 aspect-[16/10] md:col-[1/3] md:row-start-3 md:aspect-auto lg:col-[5/6] lg:row-start-1",
  "signature-beverage":
    "hidden md:block md:col-start-3 md:row-start-3 md:row-span-2 lg:col-start-6 lg:row-[1/3]",
  "chocolate-dessert":
    "hidden md:block md:col-start-1 md:row-start-4 lg:col-start-2 lg:row-start-2",
  "restaurant-ambience":
    "hidden md:block md:col-[2/4] md:row-start-2 lg:col-[3/5] lg:row-start-2",
  "truffle-mushroom-pasta":
    "hidden md:block md:col-start-2 md:row-start-4 lg:col-start-5 lg:row-start-2",
};

function GalleryTile({
  item,
  sizes,
  className,
  style,
  onOpen,
}: {
  item: GalleryItem;
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
  onOpen: () => void;
}) {
  return (
    <motion.li variants={tileReveal} style={style} className={`relative min-h-0 ${className ?? ""}`}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${item.title} full screen`}
        className="group absolute inset-0 cursor-zoom-in overflow-hidden rounded-[0.875rem] border border-[#c9a77a] transition-[border-color,box-shadow] duration-500 hover:border-gold hover:shadow-[0_0_1.25rem_rgb(232_184_113/0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          unoptimized
          loading="eager"
          sizes={sizes}
          style={{ objectPosition: item.focus }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-[#2a1a06]/70 via-[#c08a3e]/15 to-[#c08a3e]/10 p-2.5 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100 lg:p-[0.85rem]">
          <span className="text-left text-xs leading-tight text-white lg:text-[0.95rem]">
            {CATEGORY_LABELS[item.category]}
          </span>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold-soft bg-ink/40 text-gold-soft lg:size-[2.25rem]">
            <Maximize2 aria-hidden="true" strokeWidth={1.5} className="size-4 lg:size-[1.05rem]" />
          </span>
        </span>
      </button>
    </motion.li>
  );
}

/** The asymmetrical eight-photo mosaic shown for "All". */
export function GalleryMosaic({
  items,
  animate,
  onOpen,
}: {
  items: GalleryItem[];
  animate: "hidden" | "show";
  onOpen: (index: number) => void;
}) {
  return (
    <motion.ul
      variants={gridReveal}
      initial="hidden"
      animate={animate}
      exit="exit"
      className="grid grid-cols-2 gap-3 md:grid-cols-3 md:auto-rows-[12.5rem] md:gap-4 lg:aspect-[1584/465] lg:auto-rows-auto lg:grid-cols-[355fr_277fr_30fr_288fr_291fr_261fr] lg:grid-rows-[227fr_221fr] lg:gap-x-[1.025rem] lg:gap-y-[1.0625rem]"
    >
      {items.map((item, index) => (
        <GalleryTile
          key={item.id}
          item={item}
          sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
          className={MOSAIC_PLACEMENT[item.id]}
          onOpen={() => onOpen(index)}
        />
      ))}
    </motion.ul>
  );
}

/**
 * A filtered category, as a single justified row: every photo keeps its own proportions and
 * they all share one height. Phones use a compact two-column grid instead.
 */
export function GalleryRow({
  items,
  animate,
  onOpen,
}: {
  items: GalleryItem[];
  animate: "hidden" | "show";
  onOpen: (index: number) => void;
}) {
  const totalAspect = items.reduce((sum, item) => sum + item.width / item.height, 0);
  const rowWidths = {
    "--row-md": `${Math.min(100, totalAspect * 50)}%`,
    "--row-lg": `${Math.min(100, (totalAspect * 465 * 100) / 1584)}%`,
  } as React.CSSProperties;

  return (
    <div className="flex items-center justify-center lg:aspect-[1584/465]">
      <motion.ul
        variants={gridReveal}
        initial="hidden"
        animate={animate}
        exit="exit"
        style={rowWidths}
        className="grid w-full grid-cols-2 gap-3 md:flex md:w-[var(--row-md)] md:gap-4 lg:w-[var(--row-lg)] lg:gap-[1.025rem]"
      >
        {items.map((item, index) => {
          const aspect = item.width / item.height;
          return (
            <GalleryTile
              key={item.id}
              item={item}
              sizes="(min-width: 768px) 50vw, 100vw"
              className={`min-w-0 md:basis-0 md:aspect-[var(--tile-aspect)] ${
                index === 0 && items.length % 2 === 1 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
              }`}
              style={{ "--tile-aspect": aspect, flexGrow: aspect } as React.CSSProperties}
              onOpen={() => onOpen(index)}
            />
          );
        })}
      </motion.ul>
    </div>
  );
}
