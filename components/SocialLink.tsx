import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "./BrandIcons";
import { RESTAURANT } from "@/config/restaurant";

export const SOCIALS = [
  { label: "Instagram", url: RESTAURANT.instagramUrl, Icon: InstagramIcon },
  { label: "Facebook", url: RESTAURANT.facebookUrl, Icon: FacebookIcon },
  { label: "YouTube", url: RESTAURANT.youtubeUrl, Icon: YoutubeIcon },
  { label: "LinkedIn", url: RESTAURANT.linkedinUrl, Icon: LinkedinIcon },
];

/** Links out once a URL is set in config/restaurant.ts. Until then the icon shows but sends nobody anywhere. */
export default function SocialLink({
  social: { label, url, Icon },
  className,
  iconClassName,
}: {
  social: (typeof SOCIALS)[number];
  className: string;
  iconClassName: string;
}) {
  if (!url) {
    return (
      <span
        role="img"
        aria-label={`${label} link coming soon`}
        title={`${label} link coming soon`}
        data-unconfigured-social={label}
        className={`${className} cursor-default opacity-90`}
      >
        <Icon className={iconClassName} />
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className={`${className} group transition-[box-shadow,border-color] duration-300 hover:border-gold-soft hover:shadow-[0_0_1rem_rgb(244_205_142/0.4)]`}
    >
      <Icon className={`${iconClassName} transition-transform duration-300 group-hover:scale-110`} />
    </a>
  );
}
