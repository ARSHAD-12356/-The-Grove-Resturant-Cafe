import { Award, ConciergeBell, Leaf, UsersRound, type LucideIcon } from "lucide-react";

const FEATURES: { title: string; subtitle: string; Icon: LucideIcon }[] = [
  { title: "Exceptional Food", subtitle: "Fresh & Authentic", Icon: ConciergeBell },
  { title: "Warm Hospitality", subtitle: "Service with a Smile", Icon: Award },
  { title: "Elegant Ambience", subtitle: "Relax & Unwind", Icon: Leaf },
  { title: "Guest Satisfaction", subtitle: "Our Top Priority", Icon: UsersRound },
];

export default function TestimonialFeatures() {
  return (
    <ul className="grid grid-cols-2 gap-y-6 rounded-[0.875rem] border border-[#c9a77a]/80 bg-[#17100a] px-2 py-6 md:grid-cols-4 md:gap-y-0 lg:h-[8.9375rem] lg:py-0">
      {FEATURES.map(({ title, subtitle, Icon }, index) => (
        <li
          key={title}
          className="group relative flex flex-col items-center gap-2 px-2 text-center lg:flex-row lg:gap-[1.75rem] lg:pl-[3.375rem] lg:pr-0 lg:text-left"
        >
          {index > 0 && (
            <span aria-hidden="true" className="absolute inset-y-1 left-0 hidden w-px bg-gold/50 md:block lg:inset-y-[2.625rem]" />
          )}
          <Icon
            aria-hidden="true"
            strokeWidth={1.3}
            className="size-10 shrink-0 text-[#f4c273] transition-transform duration-300 group-hover:scale-105 lg:size-[4.25rem]"
          />
          <span className="flex flex-col">
            <span className="text-[0.9375rem] font-medium leading-tight text-white transition-colors duration-300 group-hover:text-gold-soft lg:text-[1.36rem]">
              {title}
            </span>
            <span className="mt-1 text-[0.8125rem] leading-tight text-[#d8d3c9] lg:mt-[0.55rem] lg:text-[1.2rem]">
              {subtitle}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
