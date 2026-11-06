/**
 * The one place for The Grove's real-world details. Every value below is DEMO data: the address,
 * phone, email, hours and WhatsApp number were supplied as placeholders and are not verified.
 *
 * Before going live:
 *  1. Replace the address, phone, email, hours and WhatsApp number. The demo number and email may
 *     belong to someone else, so visitors must never be sent to them.
 *  2. Set latitude and longitude, or paste a googleMapsEmbedUrl from Google Maps > Share > Embed a map.
 *  3. Paste the social profile URLs. An empty URL shows the icon without linking anywhere.
 *  4. Set isDemoData to false, which removes the "sample details" note on the page.
 */
export const RESTAURANT = {
  isDemoData: true,

  restaurantName: "The Grove",
  tagline: "Restaurant & Café",

  addressLines: ["123, Grove Avenue, Boring Road,", "Patna, Bihar – 800001"],

  /** Leave null until the real coordinates are known. The address is used for the map until then. */
  latitude: null as number | null,
  longitude: null as number | null,

  /** Optional overrides. When empty, these are built from the coordinates or address. */
  googleMapsEmbedUrl: "",
  googleMapsDirectionsUrl: "",

  phone: "+91 98765 43210",
  email: "hello@thegrove.com",

  openingHours: [
    { days: "Mon – Thu", hours: "11:00 AM – 10:00 PM" },
    { days: "Fri – Sat", hours: "11:00 AM – 11:00 PM" },
    { days: "Sun", hours: "11:00 AM – 10:00 PM" },
  ],

  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
  linkedinUrl: "",

  whatsappNumber: "+91 98765 43210",
  whatsappMessage: "Hello The Grove, I'd like to know more about your restaurant.",
};

const { latitude, longitude, restaurantName, addressLines } = RESTAURANT;

const fullAddress = addressLines.join(" ");
const hasCoordinates = latitude !== null && longitude !== null;

/** What Google Maps is asked to find: exact coordinates when known, otherwise the address. */
const destination = encodeURIComponent(hasCoordinates ? `${latitude},${longitude}` : `${restaurantName}, ${fullAddress}`);

export const mapEmbedUrl = RESTAURANT.googleMapsEmbedUrl || `https://www.google.com/maps?q=${destination}&z=15&output=embed`;

export const mapPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;

/** With no origin set, Google Maps works out the visitor's starting point itself. */
export const mapDirectionsUrl =
  RESTAURANT.googleMapsDirectionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

export const telHref = `tel:${RESTAURANT.phone.replace(/[^\d+]/g, "")}`;

export const mailHref = `mailto:${RESTAURANT.email}`;

export const whatsappHref = `https://wa.me/${RESTAURANT.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
  RESTAURANT.whatsappMessage,
)}`;
