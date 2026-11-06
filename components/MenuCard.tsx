"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus, Star } from "lucide-react";
import { useCart } from "./CartProvider";
import type { MenuItem } from "@/data/menuItems";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleAdd = () => {
    addItem(item.id);
    setJustAdded(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setJustAdded(false), 1300);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.125rem] border border-[#b39a78]/80 bg-[#17120c] transition-[border-color,box-shadow] duration-500 ease-out hover:border-gold hover:shadow-[0_0_1.5rem_rgb(232_184_113/0.22)]">
      <div className="relative h-[11.5rem] shrink-0 overflow-hidden rounded-b-[0.75rem] lg:h-[13.25rem]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 76vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {item.badge && (
          <span className="bg-champagne absolute left-3 top-3 rounded-[0.5rem] px-3 py-1 text-[0.8125rem] font-medium text-ink lg:left-[1rem] lg:top-[1rem] lg:px-[0.85rem] lg:py-[0.3rem] lg:text-[1.03rem]">
            {item.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 lg:px-[1.625rem] lg:pb-[1.1rem] lg:pt-[1rem]">
        <h3 className="truncate text-[1.25rem] leading-tight text-white lg:text-[1.515rem]">{item.name}</h3>
        <p className="mt-2 line-clamp-3 min-h-[4.125rem] text-sm min-[400px]:line-clamp-2 min-[400px]:min-h-[2.75rem] leading-[1.375rem] text-[#c0bab0] lg:mt-[0.5rem] lg:min-h-[3.05rem] lg:text-[1.01rem] lg:leading-[1.525rem]">
          {item.description}
        </p>

        <div className="mt-auto flex items-center pt-3 lg:pt-[0.9rem]">
          <p className="w-[5.25rem] shrink-0 text-[1.25rem] leading-none text-gold-soft lg:w-[7.5rem] lg:text-[1.6rem]">
            <span className="sr-only">Price: </span>₹ {item.price}
          </p>
          <p className="flex items-center gap-1 text-[0.8125rem] text-white lg:gap-[0.4rem] lg:text-[1.03rem]">
            <Star aria-hidden="true" className="size-3.5 fill-[#f6a623] text-[#f6a623] lg:size-[1.15rem]" />
            <span className="sr-only">Rated </span>
            {item.rating.toFixed(1)}
            <span className="text-[#a9a39a]">
              <span className="sr-only">from </span>({item.reviews})<span className="sr-only"> reviews</span>
            </span>
          </p>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${item.name} to cart`}
            className={`relative ml-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gold transition-colors duration-300 hover:bg-gold hover:text-ink active:scale-95 lg:-mr-[0.2rem] lg:size-[2.875rem] lg:border-[1.5px] ${
              justAdded ? "bg-gold text-ink" : "text-white group-hover:border-gold-soft"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={justAdded ? "added" : "add"}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.16 }}
              >
                {justAdded ? (
                  <Check strokeWidth={2} className="size-5 lg:size-[1.4rem]" />
                ) : (
                  <Plus strokeWidth={1.6} className="size-5 lg:size-[1.4rem]" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
          <span role="status" className="sr-only">
            {justAdded ? `${item.name} added to cart` : ""}
          </span>
        </div>
      </div>
    </article>
  );
}
