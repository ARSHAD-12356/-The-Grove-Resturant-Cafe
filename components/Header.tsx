"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { CalendarDays, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { GroveMark } from "./GroveMark";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#our-story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reservations", href: "#reservations" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const navList: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.07 } },
};

const navItem: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function Logo() {
  return (
    <a
      href="#home"
      aria-label="The Grove, restaurant and café, home"
      className="flex items-center gap-3 lg:gap-[1.45rem]"
    >
      <GroveMark className="h-11 w-auto text-gold lg:h-[3.2rem]" />
      <span className="flex flex-col">
        <span className="text-[1.625rem] leading-none text-white lg:text-[2.03rem]">The Grove</span>
        <span className="mt-1.5 text-[0.625rem] leading-none tracking-[0.2em] whitespace-nowrap text-gold max-[359px]:tracking-[0.08em] lg:mt-[0.5rem] lg:text-[0.8rem] lg:tracking-[0.17em]">
          RESTAURANT &amp; CAFÉ
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-x-0 top-0 z-30"
    >
      <div className="flex items-center justify-between px-6 pt-5 md:px-10 lg:relative lg:h-[6.5rem] lg:pl-[4.1875rem] lg:pr-[3.25rem] lg:pt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative z-50"
        >
          <Logo />
        </motion.div>

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block lg:pl-[0.8rem]">
          <motion.ul variants={navList} initial="hidden" animate="show" className="flex items-center gap-[2.4rem] min-[1180px]:gap-[3.3rem]">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.label;
              return (
                <motion.li key={link.label} variants={navItem}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setActive(link.label)}
                    className={`group relative block py-[0.6rem] text-[1.17rem] leading-none whitespace-nowrap transition-colors duration-300 ${
                      isActive ? "text-gold" : "text-white hover:text-gold"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-[0.15rem] origin-left bg-gold transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        <div className="relative z-50 flex items-center gap-1 md:gap-3 lg:gap-0">
          <div className="flex items-center lg:gap-[1.75rem]">
            <button
              type="button"
              aria-label="Search"
              className="hidden p-2 md:block text-white transition-colors duration-300 hover:text-gold lg:p-[0.25rem]"
            >
              <Search strokeWidth={1.6} className="size-6 lg:size-[1.625rem]" />
            </button>
            <button
              type="button"
              aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
              className="relative p-2 text-gold-soft transition-colors duration-300 hover:text-white lg:p-[0.25rem]"
            >
              <ShoppingBag strokeWidth={1.6} className="size-6 lg:size-[1.625rem]" />
              <motion.span
                key={count}
                initial={{ scale: count === 0 ? 1 : 1.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                className="bg-champagne absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full text-[0.6875rem] font-semibold text-ink lg:-right-[0.75rem] lg:-top-[0.6rem] lg:size-[1.625rem] lg:text-[0.8125rem]"
              >
                {count}
              </motion.span>
            </button>
          </div>

          <a
            href="#reservations"
            className="bg-champagne ml-3 hidden h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] text-ink transition-[transform,filter] duration-300 hover:scale-[1.04] hover:brightness-110 active:scale-100 md:inline-flex lg:ml-[2.05rem] lg:h-[3.5rem] lg:gap-[0.6rem] lg:px-[1.7rem] lg:text-[1.125rem]"
          >
            <CalendarDays strokeWidth={1.6} className="size-5 lg:size-[1.4rem]" />
            Book a Table
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-2 flex size-11 items-center justify-center text-gold-soft transition-colors hover:text-white lg:hidden"
          >
            {menuOpen ? <X strokeWidth={1.5} className="size-7" /> : <Menu strokeWidth={1.5} className="size-7" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 pb-10 pt-28 md:px-10 lg:hidden"
          >
            <motion.ul variants={navList} initial="hidden" animate="show" className="flex flex-1 flex-col justify-center">
              {NAV_LINKS.map((link) => (
                <motion.li key={link.label} variants={navItem} className="border-b border-gold/15">
                  <a
                    href={link.href}
                    aria-current={active === link.label ? "page" : undefined}
                    onClick={() => {
                      setActive(link.label);
                      setMenuOpen(false);
                    }}
                    className={`block py-4 font-display text-[2rem] leading-tight transition-colors ${
                      active === link.label ? "text-gold" : "text-white hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <a
              href="#reservations"
              onClick={() => setMenuOpen(false)}
              className="bg-champagne mt-8 flex h-14 shrink-0 items-center justify-center gap-2.5 rounded-full text-lg text-ink"
            >
              <CalendarDays strokeWidth={1.6} className="size-5" />
              Book a Table
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
