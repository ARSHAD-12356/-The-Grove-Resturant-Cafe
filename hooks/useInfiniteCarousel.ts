"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent, type RefObject } from "react";

type Options = {
  count: number;
  /** Time between automatic moves, in milliseconds. */
  autoplayMs?: number;
};

const modulo = (value: number, size: number) => ((value % size) + size) % size;

/**
 * State for an endless carousel. `position` is an unbounded counter rather than a wrapped index,
 * so moving past the last item never has to rewind and there is no visible jump.
 *
 * Autoplay waits while the pointer is over the carousel, keyboard focus is inside it, a drag is
 * under way, it is off screen or the tab is hidden, and it stays off for reduced-motion users.
 * Any move restarts the wait, so a manual click always gets the full interval.
 */
export function useInfiniteCarousel(rootRef: RefObject<HTMLElement | null>, { count, autoplayMs = 6000 }: Options) {
  const [position, setPosition] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const activeIndex = modulo(position, count);

  const next = useCallback(() => setPosition((current) => current + 1), []);
  const previous = useCallback(() => setPosition((current) => current - 1), []);
  const goTo = useCallback(
    (index: number) => {
      setPosition((current) => {
        const half = Math.floor(count / 2);
        return current + modulo(index - current + half, count) - half;
      });
    },
    [count],
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(element);

    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(motionQuery.matches);
    onMotion();
    motionQuery.addEventListener("change", onMotion);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotion);
    };
  }, [rootRef]);

  const paused = hovered || focused || dragging || !onScreen || !tabVisible || reducedMotion;
  const latestNext = useRef(next);
  useEffect(() => {
    latestNext.current = next;
  }, [next]);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => latestNext.current(), autoplayMs);
    return () => clearTimeout(timer);
  }, [paused, position, autoplayMs]);

  const rootHandlers = {
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "mouse") setHovered(true);
    },
    onPointerLeave: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "mouse") setHovered(false);
    },
    // Only keyboard focus counts: a clicked arrow keeps focus, and that must not stop autoplay forever.
    onFocus: (event: FocusEvent<HTMLElement>) => {
      if (event.target.matches(":focus-visible")) setFocused(true);
    },
    onBlur: () => setFocused(false),
  };

  return { position, activeIndex, next, previous, goTo, paused, setDragging, rootHandlers };
}
