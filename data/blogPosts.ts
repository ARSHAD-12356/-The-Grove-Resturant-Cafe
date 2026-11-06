import { Coffee, Leaf, Utensils, type LucideIcon } from "lucide-react";

/**
 * SAMPLE CONTENT. The dates, reading times and article text are demo copy, not a real publishing
 * history. Replace them with The Grove's own articles before the site goes live.
 * To add an article, add an entry here: the homepage, /blog and /blog/[slug] all read from this list.
 */
export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; width: number; height: number };

export type BlogPost = {
  id: string;
  slug: string;
  category: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  readingTime: string;
  introduction: string;
  content: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "dining-etiquette-tips",
    slug: "dining-etiquette-tips",
    category: "Dining Tips",
    icon: Utensils,
    title: "5 Dining Etiquette Tips for a Better Experience",
    description:
      "Simple yet essential dining etiquette tips to help you enjoy a more refined and pleasant restaurant experience.",
    image: {
      src: "/images/blog/dining-etiquette.webp",
      alt: "Grilled salmon on creamy risotto with herbs and edible flowers",
      width: 473,
      height: 255,
    },
    publishedAt: "2025-03-24",
    readingTime: "5 min read",
    introduction:
      "Good etiquette is not about rigid rules. It is about making the meal more comfortable for you, your companions and the people looking after you. These five habits are easy to pick up and make any evening out feel a little more special.",
    content: [
      { type: "heading", text: "1. Book ahead and arrive on time" },
      {
        type: "paragraph",
        text: "A reservation lets the restaurant prepare the right table for your party. Arriving on time keeps the evening relaxed for everyone, and if your plans change, a quick call lets the table go to another guest.",
      },
      { type: "heading", text: "2. Let your phone rest" },
      {
        type: "paragraph",
        text: "Keep your phone on silent and off the table where you can. Taking a photo of a beautiful dish is part of the fun, but the conversation around the table is what people remember.",
      },
      {
        type: "image",
        src: "/images/experience/dining-hall.webp",
        alt: "Long dining hall with ivy-covered arches and rows of set tables",
        width: 528,
        height: 294,
      },
      { type: "heading", text: "3. Work from the outside in" },
      {
        type: "paragraph",
        text: "Faced with several pieces of cutlery, start with the outermost and move inward with each course. When you pause, rest your knife and fork on the plate. Placing them together signals that you have finished.",
      },
      { type: "heading", text: "4. Wait until everyone is served" },
      {
        type: "paragraph",
        text: "Unless your companions insist that you begin, wait until the whole table has its food. It is a small courtesy that keeps the meal feeling shared.",
      },
      { type: "heading", text: "5. Be kind to your server" },
      {
        type: "paragraph",
        text: "A smile, a thank you and clear word about any allergies go a long way. Servers are there to help you enjoy the meal, so ask for recommendations and let them guide you.",
      },
    ],
  },
  {
    id: "art-of-perfect-coffee",
    slug: "art-of-perfect-coffee",
    category: "Culinary Story",
    icon: Coffee,
    title: "The Art of a Perfect Cup of Coffee",
    description:
      "Discover the journey from bean to cup, and what makes our signature coffee at The Grove truly special.",
    image: {
      src: "/images/blog/artisan-coffee.webp",
      alt: "Cappuccino with leaf latte art in a dark cup, with coffee beans on the saucer",
      width: 472,
      height: 255,
    },
    publishedAt: "2025-03-18",
    readingTime: "6 min read",
    introduction:
      "A great cup of coffee looks simple, but it is the last step of a long journey. Every stage, from the farm to the final pour, shapes what you taste in the cup.",
    content: [
      { type: "heading", text: "It starts with the bean" },
      {
        type: "paragraph",
        text: "Coffee is the seed of a fruit, and where it grows matters. Altitude, soil and climate all leave their mark, which is why one bean can taste of chocolate and another of citrus.",
      },
      { type: "heading", text: "The roast brings out the character" },
      {
        type: "paragraph",
        text: "Roasting turns a green seed into something fragrant. A lighter roast keeps the bright flavours of its origin, while a darker roast leans toward caramel and cocoa. The goal is balance rather than strength.",
      },
      {
        type: "image",
        src: "/images/menu/iced-cold-brew.webp",
        alt: "Tall glass of iced cold brew coffee with a straw on a wooden table",
        width: 800,
        height: 440,
      },
      { type: "heading", text: "Grind, water and time" },
      {
        type: "paragraph",
        text: "Freshly ground coffee loses its aroma quickly, so grinding just before brewing makes a real difference. Water just off the boil and the right contact time then draw out sweetness without bitterness.",
      },
      { type: "heading", text: "The finishing touch" },
      {
        type: "paragraph",
        text: "Well-steamed milk is silky rather than bubbly, and its natural sweetness rounds out the espresso. Latte art is more than decoration too: a clean pattern usually means the milk and the shot were both done right.",
      },
    ],
  },
  {
    id: "seasonal-specials",
    slug: "seasonal-specials",
    category: "Seasonal Specials",
    icon: Leaf,
    title: "What’s New at The Grove This Season",
    description:
      "Explore our latest seasonal dishes, limited-time creations, and special dining experiences curated just for you.",
    image: {
      src: "/images/blog/restaurant-seasonal.webp",
      alt: "Round candlelit table under pendant lights, surrounded by climbing plants",
      width: 472,
      height: 254,
    },
    publishedAt: "2025-03-10",
    readingTime: "4 min read",
    introduction:
      "Cooking with the seasons means the menu is always moving. Ingredients taste their best at their peak, and that gives the kitchen a reason to try something new.",
    content: [
      { type: "heading", text: "Why seasonal cooking tastes better" },
      {
        type: "paragraph",
        text: "Produce picked at its peak needs very little help. A ripe tomato or a fresh herb can carry a whole dish, which lets the kitchen keep things simple and let the flavour lead.",
      },
      {
        type: "image",
        src: "/images/menu/burrata-caprese.webp",
        alt: "Burrata on a bed of sliced red tomatoes on a round plate",
        width: 800,
        height: 440,
      },
      { type: "heading", text: "Limited-time creations" },
      {
        type: "paragraph",
        text: "Short-run dishes give the chefs room to experiment. Some become favourites and return, while others are simply there for a few weeks, which is part of their charm.",
      },
      { type: "heading", text: "Make an evening of it" },
      {
        type: "paragraph",
        text: "A new menu is a good excuse to gather people together. Book a table, ask what has just arrived in the kitchen, and let the season decide what you try next.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatBlogDate(publishedAt: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${publishedAt}T00:00:00Z`),
  );
}
