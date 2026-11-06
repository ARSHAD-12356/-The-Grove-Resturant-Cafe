export type GalleryCategoryId = "all" | "food" | "beverages" | "ambience" | "behind-the-scenes";

export type GalleryItem = {
  id: string;
  title: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: Exclude<GalleryCategoryId, "all">;
  /** What to keep in view when a layout crops the photo. Centred by default. */
  focus?: string;
};

export const GALLERY_CATEGORIES: { id: GalleryCategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "beverages", label: "Beverages" },
  { id: "ambience", label: "Ambience" },
  { id: "behind-the-scenes", label: "Behind the Scenes" },
];

export const CATEGORY_LABELS = Object.fromEntries(GALLERY_CATEGORIES.map(({ id, label }) => [id, label])) as Record<
  GalleryCategoryId,
  string
>;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "restaurant-interior-01",
    title: "The Dining Room",
    src: "/images/gallery/restaurant-interior-01.webp",
    alt: "Restaurant interior with a woven pendant light, climbing plants and candlelit tables",
    width: 349,
    height: 459,
    category: "ambience",
  },
  {
    id: "grilled-salmon",
    title: "Grilled Salmon",
    src: "/images/gallery/grilled-salmon.webp",
    alt: "Grilled salmon with asparagus, microgreens and a lemon wedge on a dark plate",
    width: 318,
    height: 222,
    category: "food",
  },
  {
    id: "artisan-cappuccino",
    title: "Artisan Cappuccino",
    src: "/images/gallery/artisan-cappuccino.webp",
    alt: "Cappuccino with leaf latte art in a dark cup, with coffee beans on the saucer",
    width: 282,
    height: 222,
    category: "beverages",
  },
  {
    id: "chef-plating",
    title: "Chef at Work",
    src: "/images/gallery/chef-plating.webp",
    alt: "Chef finishing a plated dish with a sprinkle of garnish",
    width: 288,
    height: 222,
    category: "behind-the-scenes",
    focus: "50% 85%",
  },
  {
    id: "signature-beverage",
    title: "Signature Beverage",
    src: "/images/gallery/signature-beverage.webp",
    alt: "Amber drink with a fresh garnish in a wine glass, against warm restaurant lights",
    width: 257,
    height: 459,
    category: "beverages",
  },
  {
    id: "chocolate-dessert",
    title: "Chocolate Dessert",
    src: "/images/gallery/chocolate-dessert.webp",
    alt: "Chocolate cake with a chocolate shard, raspberries and mint on a dark plate",
    width: 271,
    height: 216,
    category: "food",
  },
  {
    id: "restaurant-ambience",
    title: "Garden Lounge",
    src: "/images/gallery/restaurant-ambience.webp",
    alt: "Dining room under plant-covered arches, glowing with warm string lights",
    width: 330,
    height: 216,
    category: "ambience",
  },
  {
    id: "truffle-mushroom-pasta",
    title: "Truffle Mushroom Pasta",
    src: "/images/gallery/truffle-mushroom-pasta.webp",
    alt: "Creamy pasta with mushrooms and shaved parmesan in a stone bowl",
    width: 286,
    height: 216,
    category: "food",
  },
];

export function getGalleryItems(category: GalleryCategoryId): GalleryItem[] {
  return category === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === category);
}
