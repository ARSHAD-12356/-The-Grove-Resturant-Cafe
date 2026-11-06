import { GALLERY_ITEMS, type GalleryItem } from "./galleryItems";
import { MENU_ITEMS } from "./menuItems";

const VENUE_ITEMS: GalleryItem[] = [
  {
    id: "hero-table",
    title: "A Table at The Grove",
    src: "/images/hero-bg.webp",
    alt: "Candlelit table set with salmon, coffee and chocolate cake in the warmly lit restaurant",
    width: 1672,
    height: 941,
    category: "ambience",
  },
  {
    id: "experience-interior",
    title: "Under the Pendant Lights",
    src: "/images/experience/restaurant-interior.webp",
    alt: "Restaurant interior with glowing pendant lights, arched windows and a candlelit table",
    width: 463,
    height: 627,
    category: "ambience",
  },
  {
    id: "experience-hall",
    title: "The Long Hall",
    src: "/images/experience/dining-hall.webp",
    alt: "Long dining hall with ivy-covered arches and rows of set tables",
    width: 528,
    height: 294,
    category: "ambience",
  },
  {
    id: "experience-table",
    title: "Set for Two",
    src: "/images/experience/candlelit-table.webp",
    alt: "Table lamp and wine glasses on a dark marble table",
    width: 277,
    height: 310,
    category: "ambience",
  },
  {
    id: "experience-walkway",
    title: "The Garden Walk",
    src: "/images/experience/garden-walkway.webp",
    alt: "Dining walkway lined with climbing plants and warm lanterns",
    width: 226,
    height: 310,
    category: "ambience",
  },
  {
    id: "about-interior",
    title: "Evening Service",
    src: "/images/about/restaurant-interior.webp",
    alt: "Candlelit dining table in the warmly lit restaurant",
    width: 274,
    height: 280,
    category: "ambience",
  },
  {
    id: "about-chef",
    title: "The Final Touch",
    src: "/images/about/chef-plating.webp",
    alt: "Chef carefully plating a gourmet dish with tweezers",
    width: 377,
    height: 623,
    category: "behind-the-scenes",
  },
  {
    id: "story-chef",
    title: "Plated by Hand",
    src: "/images/story/chef-plating.webp",
    alt: "Black and white close-up of a chef plating a dish with tweezers",
    width: 226,
    height: 236,
    category: "behind-the-scenes",
  },
  {
    id: "about-coffee",
    title: "Morning Coffee",
    src: "/images/about/artisan-coffee.webp",
    alt: "Dark cup of coffee with latte art beside fresh pastries",
    width: 274,
    height: 263,
    category: "beverages",
  },
  {
    id: "story-coffee",
    title: "Latte Art",
    src: "/images/story/artisan-coffee.webp",
    alt: "Coffee cup with leaf latte art on a dark saucer",
    width: 209,
    height: 190,
    category: "beverages",
  },
];

/** Menu photos cropped from the reference are smaller than the rest. */
const MENU_PHOTO_SIZES: Record<string, [number, number]> = {
  "grilled-salmon": [358, 196],
  "truffle-mushroom-pasta": [358, 196],
  "signature-cappuccino": [344, 196],
  "chocolate-decadence": [358, 196],
};

const MENU_GALLERY_ITEMS: GalleryItem[] = MENU_ITEMS.map((item) => {
  const [width, height] = MENU_PHOTO_SIZES[item.id] ?? [800, 440];
  return {
    id: `menu-${item.id}`,
    title: item.name,
    src: item.image,
    alt: item.imageAlt,
    width,
    height,
    category: item.category === "cafe-beverages" ? "beverages" : "food",
  };
});

/** Deals photos out by category so similar shots do not bunch together in the masonry. */
function interleave(items: GalleryItem[]): GalleryItem[] {
  const pattern: GalleryItem["category"][] = ["ambience", "food", "beverages", "food", "behind-the-scenes", "food"];
  const queues = new Map<GalleryItem["category"], GalleryItem[]>();
  for (const item of items) queues.set(item.category, [...(queues.get(item.category) ?? []), item]);

  const result: GalleryItem[] = [];
  for (let step = 0; result.length < items.length; step++) {
    const next = queues.get(pattern[step % pattern.length])?.shift();
    if (next) result.push(next);
  }
  return result;
}

/** These menu shots look much like the gallery's own, so they go last to keep the two apart. */
const LOOKALIKE_IDS = Object.keys(MENU_PHOTO_SIZES).map((id) => `menu-${id}`);

/** Every photograph on the site, shown on the /gallery page. */
export const FULL_GALLERY_ITEMS = interleave([
  ...GALLERY_ITEMS,
  ...VENUE_ITEMS,
  ...MENU_GALLERY_ITEMS.filter(({ id }) => !LOOKALIKE_IDS.includes(id)),
  ...MENU_GALLERY_ITEMS.filter(({ id }) => LOOKALIKE_IDS.includes(id)),
]);
