"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import GalleryFilters from "./GalleryFilters";
import { GalleryMosaic, GalleryRow } from "./GalleryGrid";
import GalleryLightbox from "./GalleryLightbox";
import { getGalleryItems, type GalleryCategoryId } from "@/data/galleryItems";

/** The homepage gallery: category filters, the photo layout and the full-screen viewer. */
export default function GalleryBrowser({ animate }: { animate: "hidden" | "show" }) {
  const [category, setCategory] = useState<GalleryCategoryId>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = useMemo(() => getGalleryItems(category), [category]);
  const Layout = category === "all" ? GalleryMosaic : GalleryRow;

  return (
    <>
      <GalleryFilters active={category} onSelect={setCategory} animate={animate} />

      <div className="mt-6 lg:mt-[2rem]">
        <AnimatePresence mode="wait" initial={false}>
          <Layout key={category} items={items} animate={animate} onOpen={setOpenIndex} />
        </AnimatePresence>
      </div>

      <GalleryLightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  );
}
