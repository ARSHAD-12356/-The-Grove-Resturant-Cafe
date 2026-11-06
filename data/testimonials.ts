/**
 * SAMPLE CONTENT, not real customer feedback.
 *
 * These names, roles and reviews are placeholders, and customers 04 to 09 use stock photos of
 * people who have no connection to The Grove. Replace every entry with genuine reviews, and
 * photos used with each guest's permission, before this site goes live.
 */
export type Testimonial = {
  id: string;
  name: string;
  designation: string;
  review: string;
  image: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "customer-01",
    name: "Priya Sharma",
    designation: "Food Blogger",
    review:
      "The food was absolutely delicious, the ambience was perfect, and the service was outstanding. A must-visit for food lovers!",
    image: "/images/testimonials/customer-01.webp",
  },
  {
    id: "customer-02",
    name: "Rahul Verma",
    designation: "Regular Guest",
    review:
      "A perfect place for family dinners! The dishes are full of flavor, the staff is very courteous, and the overall experience is just wonderful.",
    image: "/images/testimonials/customer-02.webp",
  },
  {
    id: "customer-03",
    name: "Ananya Singh",
    designation: "Verified Customer",
    review:
      "One of the best dining experiences in the city. Great food, cozy atmosphere, and attention to detail in everything.",
    image: "/images/testimonials/customer-03.webp",
  },
  {
    id: "customer-04",
    name: "Arjun Mehta",
    designation: "Coffee Enthusiast",
    review:
      "The coffee is exceptional, the desserts are delightful, and the atmosphere makes every visit special.",
    image: "/images/testimonials/customer-04.webp",
  },
  {
    id: "customer-05",
    name: "Sneha Kapoor",
    designation: "Regular Guest",
    review:
      "Beautiful interiors, delicious food and genuinely warm hospitality. The Grove has become one of my favorite places.",
    image: "/images/testimonials/customer-05.webp",
  },
  {
    id: "customer-06",
    name: "Rohan Malhotra",
    designation: "Food Lover",
    review:
      "Every dish feels thoughtfully prepared. The presentation, flavors and service make the experience memorable.",
    image: "/images/testimonials/customer-06.webp",
  },
  {
    id: "customer-07",
    name: "Meera Joshi",
    designation: "Café Guest",
    review:
      "A lovely café with premium coffee, delicious treats and a peaceful ambience. Perfect for spending quality time.",
    image: "/images/testimonials/customer-07.webp",
  },
  {
    id: "customer-08",
    name: "Karan Khanna",
    designation: "Regular Guest",
    review:
      "From the welcoming staff to the beautifully presented dishes, everything feels premium and thoughtfully managed.",
    image: "/images/testimonials/customer-08.webp",
  },
  {
    id: "customer-09",
    name: "Aditi Rao",
    designation: "Dessert Lover",
    review:
      "The desserts are incredible! I also loved the warm lighting and elegant interiors. Definitely worth visiting again.",
    image: "/images/testimonials/customer-09.webp",
  },
];
