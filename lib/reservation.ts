import { LARGE_PARTY, MAX_LISTED_GUESTS, RESERVATION_TIME_SLOTS } from "@/data/reservationOptions";

export type Reservation = {
  fullName: string;
  phoneNumber: string;
  reservationDate: string;
  reservationTime: string;
  numberOfGuests: number;
};

/** What the form holds while someone is typing. Nothing here is written to browser storage. */
export type ReservationDraft = {
  fullName: string;
  phoneNumber: string;
  reservationDate: string;
  reservationTime: string;
  guestChoice: string;
  exactGuests: string;
};

export type ReservationField = keyof ReservationDraft;
export type ReservationErrors = Partial<Record<ReservationField, string>>;

const MAX_PARTY_SIZE = 500;

/** Local calendar date as YYYY-MM-DD, the format date inputs use. */
export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Whether a slot has already gone by, which can only happen on today's date. */
export function isSlotPast(dateKey: string, slot: string, now = new Date()): boolean {
  if (dateKey !== toDateKey(now)) return false;
  const [hours, minutes] = slot.split(":").map(Number);
  return hours * 60 + minutes <= now.getHours() * 60 + now.getMinutes();
}

/** Accepts 9876543210, 09876543210, +91 98765 43210 or 91-98765-43210. Returns +91XXXXXXXXXX or null. */
export function normalizeIndianMobile(value: string): string | null {
  const compact = value.replace(/[\s()-]/g, "");
  const match = compact.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  return match ? `+91${match[1]}` : null;
}

export function validateReservation(draft: ReservationDraft, now = new Date()): ReservationErrors {
  const errors: ReservationErrors = {};

  if (draft.fullName.trim().length === 0) errors.fullName = "Please enter your name.";

  if (draft.phoneNumber.trim().length === 0) {
    errors.phoneNumber = "Please enter your phone number.";
  } else if (!normalizeIndianMobile(draft.phoneNumber)) {
    errors.phoneNumber = "Enter a valid 10-digit Indian mobile number, with or without +91.";
  }

  if (!draft.reservationDate) {
    errors.reservationDate = "Please select a date.";
  } else if (draft.reservationDate < toDateKey(now)) {
    errors.reservationDate = "Please choose today or a future date.";
  }

  if (!draft.reservationTime) {
    errors.reservationTime = "Please select a time.";
  } else if (!RESERVATION_TIME_SLOTS.includes(draft.reservationTime)) {
    errors.reservationTime = "Please choose one of the available times.";
  } else if (draft.reservationDate && isSlotPast(draft.reservationDate, draft.reservationTime, now)) {
    errors.reservationTime = "That time has already passed today. Please choose a later one.";
  }

  if (draft.guestChoice === LARGE_PARTY) {
    const guests = Number(draft.exactGuests);
    if (!Number.isInteger(guests) || guests <= MAX_LISTED_GUESTS || guests > MAX_PARTY_SIZE) {
      errors.exactGuests = `Please enter the exact number of guests, ${MAX_LISTED_GUESTS + 1} or more.`;
    }
  }

  return errors;
}

/** Call only after validateReservation returns no errors. */
export function toReservation(draft: ReservationDraft): Reservation {
  return {
    fullName: draft.fullName.trim(),
    phoneNumber: normalizeIndianMobile(draft.phoneNumber) ?? draft.phoneNumber,
    reservationDate: draft.reservationDate,
    reservationTime: draft.reservationTime,
    numberOfGuests: Number(draft.guestChoice === LARGE_PARTY ? draft.exactGuests : draft.guestChoice),
  };
}

export type SubmissionResult =
  /** No booking service is configured, so nothing was sent anywhere. */
  | { outcome: "not-connected" }
  /** The service accepted the request, but the restaurant has not confirmed the table. */
  | { outcome: "requested"; reference?: string }
  /** The service explicitly confirmed the table. */
  | { outcome: "confirmed"; reference?: string }
  | { outcome: "failed" };

const REQUEST_TIMEOUT_MS = 15000;

/**
 * The one place to connect a booking backend. Set NEXT_PUBLIC_RESERVATION_ENDPOINT to a URL that
 * accepts the Reservation as a JSON POST, and answers 2xx with { status, reference? }.
 *
 * Only status "confirmed" is ever shown to the guest as a confirmed booking. Any other 2xx reply
 * counts as a request that is still waiting on the restaurant. To use WhatsApp or a booking
 * platform instead, replace the body of this function and keep the same result types.
 */
export async function submitReservation(reservation: Reservation): Promise<SubmissionResult> {
  const endpoint = process.env.NEXT_PUBLIC_RESERVATION_ENDPOINT;
  if (!endpoint) return { outcome: "not-connected" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) return { outcome: "failed" };

    const body: unknown = await response.json().catch(() => null);
    const { status, reference } = (body ?? {}) as { status?: unknown; reference?: unknown };
    const safeReference = typeof reference === "string" && reference ? reference : undefined;

    return status === "confirmed"
      ? { outcome: "confirmed", reference: safeReference }
      : { outcome: "requested", reference: safeReference };
  } catch {
    return { outcome: "failed" };
  }
}
