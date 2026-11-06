"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Maximize, Minimize, Utensils } from "lucide-react";
import { mapEmbedUrl, RESTAURANT } from "@/config/restaurant";

const subscribeToNothing = () => () => {};

/**
 * A real Google Maps embed, which needs no API key. Zooming, panning and the location pin all come
 * from Google. The embed has no fullscreen control of its own, so that button drives the browser's
 * Fullscreen API. Browsers without it, such as Safari on iPhone, simply do not show the button.
 */
export default function RestaurantMap() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canFullscreen = useSyncExternalStore(
    subscribeToNothing,
    () => Boolean(document.fullscreenEnabled),
    () => false,
  );

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void frameRef.current?.requestFullscreen();
  };

  const Icon = isFullscreen ? Minimize : Maximize;

  return (
    <div
      ref={frameRef}
      className="relative h-full min-h-[20rem] overflow-hidden rounded-[1.25rem] border border-gold/45 bg-[#23201c] transition-colors duration-500 hover:border-gold-soft md:min-h-[24rem] lg:min-h-0"
    >
      <iframe
        src={mapEmbedUrl}
        title={`Map showing ${RESTAURANT.restaurantName}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 size-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.75)_brightness(0.95)]"
      />

      {/* A fixed caption, not a pin: it cannot follow the map when someone pans inside the embed. It stays clear of Google's logo and controls. */}
      <div className="pointer-events-none absolute left-3 top-14 flex items-center gap-2.5 rounded-[0.75rem] border border-gold/80 bg-[#17110a]/95 px-3 py-2 md:left-1/2 md:top-3 md:-translate-x-1/2 lg:top-[1rem] lg:gap-[0.75rem] lg:px-[1.1rem] lg:py-[0.55rem]">
        <Utensils aria-hidden="true" strokeWidth={1.6} className="size-5 text-gold-soft lg:size-[1.7rem]" />
        <p className="leading-tight text-white">
          <span className="block text-[0.9375rem] lg:text-[1.25rem]">{RESTAURANT.restaurantName}</span>
          <span className="block text-xs text-[#ece7dc] lg:text-[1.05rem]">{RESTAURANT.tagline}</span>
        </p>
      </div>

      {canFullscreen && (
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit full screen map" : "View map full screen"}
          aria-pressed={isFullscreen}
          className="absolute right-3 top-3 flex size-11 cursor-pointer items-center justify-center rounded-[0.6rem] border border-gold/50 bg-[#17110a]/95 text-white transition-colors duration-300 hover:border-gold hover:text-gold-soft lg:right-[1rem] lg:top-[1rem] lg:size-[2.75rem]"
        >
          <Icon aria-hidden="true" strokeWidth={1.7} className="size-5 lg:size-[1.45rem]" />
        </button>
      )}
    </div>
  );
}
