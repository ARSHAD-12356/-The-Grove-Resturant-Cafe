/** Demo booking slots in 24-hour time. Replace them with the restaurant's real hours. */
export const RESERVATION_TIME_SLOTS = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export const MAX_LISTED_GUESTS = 10;
export const LARGE_PARTY = "more";

export const GUEST_OPTIONS = [
  ...Array.from({ length: MAX_LISTED_GUESTS }, (_, index) => ({
    value: String(index + 1),
    label: index === 0 ? "1 Guest" : `${index + 1} Guests`,
  })),
  { value: LARGE_PARTY, label: `More than ${MAX_LISTED_GUESTS} Guests` },
];

/** "19:00" becomes "07:00 PM". */
export function formatTimeSlot(slot: string): string {
  const [hours, minutes] = slot.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour = String(hours % 12 || 12).padStart(2, "0");
  return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
}
