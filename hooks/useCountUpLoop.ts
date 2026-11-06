"use client";

import { useEffect, useRef, type RefObject } from "react";

type Options = {
  /** Length of the count-up, in milliseconds. */
  duration?: number;
  /** How long the final values stay on screen before the next cycle, in milliseconds. */
  hold?: number;
  /** Length of the smooth return to zero, in milliseconds. */
  resetDuration?: number;
};

type Phase = "idle" | "counting" | "holding" | "resetting";

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInOutSine = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;

/**
 * Runs an endless count-up cycle: count to the target, hold, ease back to zero, repeat.
 *
 * `onProgress` receives 0 to 1 on every frame, so callers can write straight to the DOM
 * without re-rendering. The cycle starts when `targetRef` first enters the viewport, and
 * animation frames pause while it is off screen. There is only ever one loop, and all of it
 * is torn down on unmount, which also keeps React Strict Mode's double effect run safe.
 */
export function useCountUpLoop(
  targetRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  { duration = 2800, hold = 30000, resetDuration = 500 }: Options = {},
) {
  const callback = useRef(onProgress);

  useEffect(() => {
    callback.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      callback.current(1);
      return;
    }

    let phase: Phase = "idle";
    let elapsed = 0;
    let lastTime = 0;
    let frame: number | null = null;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let visible = false;
    let restartDue = false;

    const step = (now: number) => {
      // Capped so a throttled or backgrounded tab resumes instead of jumping ahead.
      elapsed += Math.min(now - lastTime, 100);
      lastTime = now;

      if (phase === "resetting") {
        const progress = Math.min(elapsed / resetDuration, 1);
        callback.current(1 - easeInOutSine(progress));
        if (progress >= 1) {
          phase = "counting";
          elapsed = 0;
        }
      } else if (phase === "counting") {
        const progress = Math.min(elapsed / duration, 1);
        callback.current(progress >= 1 ? 1 : easeOutCubic(progress));
        if (progress >= 1) {
          phase = "holding";
          frame = null;
          holdTimer = setTimeout(endHold, hold);
          return;
        }
      }
      frame = requestAnimationFrame(step);
    };

    const run = () => {
      if (frame !== null || !visible) return;
      lastTime = performance.now();
      frame = requestAnimationFrame(step);
    };

    const pause = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    const startReset = () => {
      restartDue = false;
      phase = "resetting";
      elapsed = 0;
      run();
    };

    function endHold() {
      holdTimer = null;
      if (visible) startReset();
      else restartDue = true;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          pause();
        } else if (phase === "idle") {
          phase = "counting";
          elapsed = 0;
          run();
        } else if (phase === "holding") {
          if (restartDue) startReset();
        } else {
          run();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      pause();
      if (holdTimer !== null) clearTimeout(holdTimer);
    };
  }, [targetRef, duration, hold, resetDuration]);
}
