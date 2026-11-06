import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export default function TestimonialCard({ testimonial, active }: { testimonial: Testimonial; active: boolean }) {
  const { name, designation, review, image } = testimonial;

  return (
    <article
      className={`relative flex h-full flex-col rounded-[1.25rem] border px-5 pb-5 pt-4 transition-[border-color,background-color,box-shadow] duration-500 lg:rounded-[1.375rem] lg:pb-[1.45rem] lg:pl-[3.125rem] lg:pr-[1.75rem] lg:pt-[2.75rem] ${
        active
          ? "border-[#f0b860] bg-[linear-gradient(155deg,#3a2710_0%,#241808_55%,#1a1207_100%)] shadow-[0_0_1.9rem_rgb(240_184_96/0.32)]"
          : "border-[#b39a78]/70 bg-[#1c140b] shadow-[0_0_1rem_rgb(240_184_96/0.05)]"
      }`}
    >
      <span
        aria-hidden="true"
        className="block h-10 font-display text-[4.75rem] font-bold leading-[0.95] text-gold-soft lg:absolute lg:left-[2.25rem] lg:top-[1rem] lg:h-auto lg:text-[6rem]"
      >
        “
      </span>

      <div
        role="img"
        aria-label="Rated 5 out of 5 stars"
        className="-mt-7 flex justify-center gap-[0.2rem] lg:mt-0 lg:-translate-x-[0.75rem]"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} aria-hidden="true" className="size-5 fill-[#ffc14d] text-[#ffc14d] lg:size-[1.45rem]" />
        ))}
      </div>

      <blockquote className="mt-4 mb-5 text-[1.0625rem] leading-[1.6] text-white lg:mb-[1.5rem] lg:mt-[1.25rem] lg:text-[1.34rem] lg:leading-[2.03rem]">
        “{review}”
      </blockquote>

      <footer className="mt-auto flex items-center gap-4 lg:gap-[1.6rem]">
        <span className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-[#e8bd7b] lg:size-[4.85rem]">
          <Image src={image} alt={`Portrait of ${name}`} fill unoptimized loading="eager" sizes="5rem" className="object-cover" />
        </span>
        <span className="flex min-w-0 flex-col">
          <cite className="text-lg font-medium not-italic leading-tight text-white lg:text-[1.4rem]">{name}</cite>
          <span className="mt-1 text-[0.9375rem] leading-tight text-[#d4cdc1] lg:mt-[0.4rem] lg:text-[1.2rem]">
            {designation}
          </span>
        </span>
      </footer>
    </article>
  );
}
