"use client";

import { useCallback, useRef, type DragEvent, type MouseEvent, type PointerEvent, type RefObject } from "react";

/** Movement, in pixels, before a press counts as a drag rather than a click. */
const DRAG_THRESHOLD = 5;

type Drag = { pointerId: number; startX: number; startScroll: number; moved: boolean };

/**
 * Lets a mouse press and drag a scrollbar-less rail. The rail never moves on its own or on
 * hover. It stays a native scroller, so touch swipes, trackpads and keyboard focus keep working.
 */
export function useDragRail(railRef: RefObject<HTMLElement | null>, { dragFromLinks = false } = {}) {
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const rail = railRef.current;
      if (!rail || event.pointerType !== "mouse" || event.button !== 0) return;

      suppressClick.current = false;
      if ((event.target as Element).closest(dragFromLinks ? "button" : "button, a")) return;

      drag.current = { pointerId: event.pointerId, startX: event.clientX, startScroll: rail.scrollLeft, moved: false };
    },
    [railRef, dragFromLinks],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const rail = railRef.current;
      const current = drag.current;
      if (!rail || !current || event.pointerId !== current.pointerId) return;

      // The button was released somewhere the rail could not see it.
      if (event.buttons === 0) {
        drag.current = null;
        return;
      }

      const distance = event.clientX - current.startX;
      if (!current.moved) {
        if (Math.abs(distance) < DRAG_THRESHOLD) return;
        current.moved = true;
        rail.setPointerCapture(event.pointerId);
      }
      rail.scrollLeft = current.startScroll - distance;
    },
    [railRef],
  );

  const endDrag = useCallback(() => {
    if (drag.current?.moved) suppressClick.current = true;
    drag.current = null;
  }, []);

  // A drag that ends over a card must not also count as a click on it.
  const onClickCapture = useCallback((event: MouseEvent<HTMLElement>) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  }, []);

  // Stops the browser picking up a photo as a file instead of dragging the rail.
  const onDragStart = useCallback((event: DragEvent<HTMLElement>) => event.preventDefault(), []);

  const reset = useCallback(() => {
    drag.current = null;
    if (railRef.current) railRef.current.scrollLeft = 0;
  }, [railRef]);

  return {
    railHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onDragStart,
    },
    reset,
  };
}
