import type { ReactNode } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { GroveMark } from "./GroveMark";
import SocialLink, { SOCIALS } from "./SocialLink";
import { mailHref, mapPlaceUrl, RESTAURANT, telHref } from "@/config/restaurant";

const EXPLORE_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Menu", href: "/#menu" },
  { label: "Our Story", href: "/#story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reservations", href: "/#reservations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const LINK = "transition-colors duration-300 hover:text-gold-soft focus-visible:text-gold-soft";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-[1.375rem] font-normal italic leading-none text-gold lg:text-[1.75rem]">{title}</h2>
      <span aria-hidden="true" className="mt-3 block h-px w-10 bg-gold/60 lg:mt-[0.9rem] lg:w-[3rem]" />
      <div className="mt-4 text-[0.9375rem] leading-[1.6] text-[#d8d3c9] lg:mt-[1.2rem] lg:text-[1.1rem]">{children}</div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/35 bg-[#0a0803]">
      <div className="mx-auto grid max-w-[104.5rem] gap-9 px-6 pb-8 pt-12 md:grid-cols-2 md:gap-10 md:px-10 lg:grid-cols-[1.5fr_0.8fr_1.25fr_1.1fr] lg:gap-[3.5rem] lg:px-[5.5625rem] lg:pb-[3rem] lg:pt-[4rem]">
        <div>
          <Link href="/#home" aria-label="The Grove, restaurant and café, home" className="inline-flex items-center gap-3 lg:gap-[1.25rem]">
            <GroveMark className="h-14 w-auto text-gold lg:h-[4.25rem]" />
            <span className="flex flex-col">
              <span className="text-[1.875rem] leading-none text-white lg:text-[2.6rem]">{RESTAURANT.restaurantName}</span>
              <span className="mt-1.5 whitespace-nowrap text-[0.6875rem] leading-none tracking-[0.2em] text-gold lg:mt-[0.6rem] lg:text-[0.95rem]">
                RESTAURANT &amp; CAFÉ
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-[26rem] text-[0.9375rem] leading-[1.6] text-[#d8d3c9] lg:mt-[1.4rem] lg:max-w-[28rem] lg:text-[1.1rem]">
            Great food, exceptional coffee and genuine hospitality, all in one warm and welcoming place.
          </p>
          <ul aria-label="Social media" className="mt-5 flex gap-3 lg:mt-[1.5rem] lg:gap-[0.9rem]">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <SocialLink
                  social={social}
                  className="flex size-11 items-center justify-center rounded-full border border-gold-soft/70 text-gold-soft lg:size-[3rem]"
                  iconClassName="size-5 lg:size-[1.4rem]"
                />
              </li>
            ))}
          </ul>
        </div>

        <Column title="Explore">
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-4 md:grid-cols-1">
              {EXPLORE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={`${LINK} flex min-h-11 items-center md:min-h-9 lg:min-h-[2.2rem]`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Column>

        <Column title="Visit Us">
          <ul className="flex flex-col gap-3 lg:gap-[0.9rem]">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-gold lg:size-[1.4rem]" />
              <a
                href={mapPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${RESTAURANT.addressLines.join(" ")} (opens Google Maps in a new tab)`}
                className={LINK}
              >
                {RESTAURANT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-gold lg:size-[1.4rem]" />
              <a href={telHref} className={`${LINK} flex min-h-11 items-center md:min-h-0`}>
                {RESTAURANT.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-gold lg:size-[1.4rem]" />
              <a href={mailHref} className={`${LINK} flex min-h-11 items-center break-all md:min-h-0`}>
                {RESTAURANT.email}
              </a>
            </li>
          </ul>
        </Column>

        <Column title="Opening Hours">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 lg:gap-y-[0.5rem]">
            {RESTAURANT.openingHours.map(({ days, hours }) => (
              <div key={days} className="contents">
                <dt className="whitespace-nowrap text-white">{days}</dt>
                <dd className="whitespace-nowrap">{hours}</dd>
              </div>
            ))}
          </dl>
        </Column>
      </div>

      <div className="mx-auto max-w-[104.5rem] px-6 pb-6 md:px-10 lg:px-[5.5625rem] lg:pb-[1.75rem]">
        <p className="border-t border-gold/25 pt-5 text-center text-[0.8125rem] text-mist lg:pt-[1.5rem] lg:text-[0.95rem]">
          © {new Date().getFullYear()} {RESTAURANT.restaurantName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
