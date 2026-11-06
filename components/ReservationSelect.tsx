"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type SelectOption = { value: string; label: string; disabled?: boolean };

/** A dark, gold-accented dropdown that follows the listbox keyboard pattern. */
export default function ReservationSelect({
  id,
  value,
  options,
  placeholder,
  invalid,
  describedBy,
  className,
  onChange,
}: {
  id: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  className: string;
  onChange: (value: string) => void;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selected = options.find((option) => option.value === value);

  const openList = () => {
    const current = options.findIndex((option) => option.value === value && !option.disabled);
    setActiveIndex(current >= 0 ? current : options.findIndex((option) => !option.disabled));
    setOpen(true);
    buttonRef.current?.focus();
  };

  const choose = (option?: SelectOption) => {
    if (!option || option.disabled) return;
    onChange(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const moveActive = (direction: 1 | -1, from = activeIndex) => {
    for (let index = from + direction; index >= 0 && index < options.length; index += direction) {
      if (!options[index].disabled) {
        setActiveIndex(index);
        return;
      }
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (event.key === "Home") moveActive(1, -1);
      else moveActive(-1, options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(options[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        aria-required="true"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${className} cursor-pointer justify-between text-left`}
      >
        <span className={`truncate ${selected ? "" : "text-[#a9a39a]"}`}>{selected?.label ?? placeholder}</span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.75}
          className={`ml-2 size-5 shrink-0 text-gold-soft transition-transform duration-300 lg:size-[1.4rem] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full z-30 mt-1.5 max-h-64 overflow-y-auto overscroll-contain rounded-[0.75rem] border border-gold/50 bg-[#1d160c] py-1.5 shadow-[0_0.75rem_2rem_rgb(0_0_0/0.65)] lg:max-h-[17rem]"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  data-active={index === activeIndex}
                  onClick={() => choose(option)}
                  onPointerMove={() => {
                    if (!option.disabled) setActiveIndex(index);
                  }}
                  className={`mx-1.5 flex min-h-11 items-center rounded-[0.5rem] px-3 text-base transition-colors duration-150 lg:min-h-[2.75rem] lg:text-[1.15rem] ${
                    option.disabled
                      ? "cursor-not-allowed text-white/30 line-through"
                      : isSelected
                        ? "bg-champagne cursor-pointer font-medium text-ink"
                        : index === activeIndex
                          ? "cursor-pointer bg-gold/15 text-gold-soft"
                          : "cursor-pointer text-white"
                  }`}
                >
                  {option.label}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
