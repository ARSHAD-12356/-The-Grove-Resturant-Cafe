"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Clock,
  Hourglass,
  Loader2,
  Phone,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import ReservationSelect from "./ReservationSelect";
import {
  formatTimeSlot,
  GUEST_OPTIONS,
  LARGE_PARTY,
  MAX_LISTED_GUESTS,
  RESERVATION_TIME_SLOTS,
} from "@/data/reservationOptions";
import {
  isSlotPast,
  submitReservation,
  toDateKey,
  toReservation,
  validateReservation,
  type Reservation,
  type ReservationDraft,
  type ReservationErrors,
  type ReservationField,
} from "@/lib/reservation";

const EASE = [0.22, 1, 0.36, 1] as const;

const EMPTY_DRAFT: ReservationDraft = {
  fullName: "",
  phoneNumber: "",
  reservationDate: "",
  reservationTime: "",
  guestChoice: "2",
  exactGuests: "",
};

const fieldList: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.09 } },
};

const fieldReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const CONTROL =
  "flex h-12 min-h-11 w-full items-center rounded-[0.75rem] border bg-[#1a140b] px-4 text-base text-white outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#a9a39a] focus:border-gold-soft focus:shadow-[0_0_0_3px_rgb(244_205_142/0.18)] lg:h-[3.375rem] lg:text-[1.2rem]";
const CONTROL_NARROW = "lg:px-[1.1rem]";

const borderFor = (invalid: boolean) => (invalid ? "border-[#ec8d78]" : "border-[#c9a77a]/55 hover:border-[#c9a77a]");

/** Parsed by hand so the date stays in local time rather than shifting through UTC. */
function formatDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(
    new Date(year, month - 1, day),
  );
}

const subscribeToNothing = () => () => {};

function ErrorText({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          key="error"
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="overflow-hidden text-sm leading-snug text-[#f5a896] lg:text-[1rem]"
        >
          <span className="block pt-1.5">{message}</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  Icon,
  error,
  children,
}: {
  id: string;
  label: string;
  Icon: LucideIcon;
  error?: string;
  children: ReactNode;
}) {
  return (
    <motion.div variants={fieldReveal} className="relative focus-within:z-30">
      <div className="flex items-center gap-2.5 lg:h-[1.5rem] lg:gap-0 lg:pl-[3rem]">
        <Icon
          aria-hidden="true"
          strokeWidth={1.4}
          className="size-5 shrink-0 text-gold lg:absolute lg:left-[0.1rem] lg:top-[0.15rem] lg:size-[1.95rem]"
        />
        <label htmlFor={id} className="text-[0.9375rem] leading-tight text-white lg:text-[1.15rem]">
          {label} <span aria-hidden="true">*</span>
        </label>
      </div>
      <div className="mt-2 lg:ml-[3rem] lg:mt-[0.5rem]">
        {children}
        <ErrorText id={`${id}-error`} message={error} />
      </div>
    </motion.div>
  );
}

function DateControl({
  value,
  min,
  invalid,
  onChange,
  onBlur,
}: {
  value: string;
  min?: string;
  invalid: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    try {
      inputRef.current?.showPicker();
    } catch {
      // Browsers without showPicker open their own picker when the input is tapped.
    }
  };

  return (
    <div
      className={`${CONTROL} ${CONTROL_NARROW} ${borderFor(invalid)} relative justify-between focus-within:border-gold-soft focus-within:shadow-[0_0_0_3px_rgb(244_205_142/0.18)]`}
    >
      <span className={`truncate ${value ? "" : "text-[#a9a39a]"}`}>{value ? formatDate(value) : "Select date"}</span>
      <ChevronDown aria-hidden="true" strokeWidth={1.75} className="ml-2 size-5 shrink-0 text-gold-soft lg:size-[1.4rem]" />
      <input
        ref={inputRef}
        id="reservation-date"
        type="date"
        required
        min={min}
        value={value}
        aria-required="true"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? "reservation-date-error" : undefined}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPicker();
          }
        }}
        className="absolute inset-0 size-full cursor-pointer opacity-0 [color-scheme:dark]"
      />
    </div>
  );
}

function DetailsList({ reservation }: { reservation: Reservation }) {
  const rows = [
    ["Name", reservation.fullName],
    ["Phone", reservation.phoneNumber],
    ["Date", formatDate(reservation.reservationDate)],
    ["Time", formatTimeSlot(reservation.reservationTime)],
    ["Guests", String(reservation.numberOfGuests)],
  ];
  return (
    <dl className="mt-5 grid gap-x-8 gap-y-3 text-left sm:grid-cols-2 lg:mt-[1.5rem] lg:gap-y-[0.9rem]">
      {rows.map(([term, detail]) => (
        <div key={term} className="min-w-0 border-b border-gold/20 pb-2">
          <dt className="text-sm text-gold-soft lg:text-[1rem]">{term}</dt>
          <dd className="truncate text-base text-white lg:text-[1.2rem]">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

type Submitted = { reservation: Reservation; confirmed: boolean; reference?: string };

function SubmittedPanel({ submitted, onReset }: { submitted: Submitted; onReset: () => void }) {
  const { reservation, confirmed, reference } = submitted;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const Icon = confirmed ? CircleCheck : Hourglass;

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="text-center"
    >
      <Icon aria-hidden="true" strokeWidth={1.3} className="mx-auto size-11 text-gold-soft lg:size-[3.25rem]" />
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 font-display text-3xl font-normal text-white outline-none lg:mt-[0.75rem] lg:text-[2.5rem]"
      >
        {confirmed ? "Your table is confirmed" : "Reservation request sent"}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#d8d3c9] lg:text-[1.15rem]">
        {confirmed
          ? "The restaurant has confirmed your booking. We look forward to welcoming you."
          : "Your request has been received, but it is not confirmed yet. The restaurant will contact you to confirm your table."}
      </p>
      {reference && (
        <p className="mt-3 text-[0.9375rem] text-gold-soft lg:text-[1.15rem]">
          Reference: <strong className="font-medium">{reference}</strong>
        </p>
      )}
      <DetailsList reservation={reservation} />
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-gold/80 px-7 text-base text-white transition-colors duration-300 hover:bg-gold/10 hover:text-gold-soft lg:mt-[1.5rem] lg:h-[3.25rem] lg:text-[1.15rem]"
      >
        Make another booking
      </button>
    </motion.div>
  );
}

export default function ReservationForm({ animate }: { animate: "hidden" | "show" }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<"not-connected" | "failed" | null>(null);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Read on the client only, so a server in another timezone cannot cause a hydration mismatch.
  const today = useSyncExternalStore(
    subscribeToNothing,
    () => toDateKey(new Date()),
    () => "",
  );

  const timeOptions = useMemo(
    () =>
      RESERVATION_TIME_SLOTS.map((slot) => ({
        value: slot,
        label: formatTimeSlot(slot),
        disabled: Boolean(draft.reservationDate) && isSlotPast(draft.reservationDate, slot),
      })),
    [draft.reservationDate],
  );

  const update = (field: ReservationField, value: string) => {
    const next = { ...draft, [field]: value };
    setDraft(next);
    setNotice(null);
    // Once a field is showing an error, or the choice is a discrete pick, keep its message current.
    if (errors[field] || field === "reservationDate" || field === "reservationTime") {
      setErrors((current) => ({ ...current, [field]: validateReservation(next)[field] }));
    }
  };

  const validateField = (field: ReservationField) => {
    setErrors((current) => ({ ...current, [field]: validateReservation(draft)[field] }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    const found = validateReservation(draft);
    setErrors(found);
    setNotice(null);

    if (Object.keys(found).length > 0) {
      const firstField = (["fullName", "phoneNumber", "reservationDate", "reservationTime", "exactGuests"] as const).find(
        (field) => found[field],
      );
      const ids: Record<string, string> = {
        fullName: "reservation-name",
        phoneNumber: "reservation-phone",
        reservationDate: "reservation-date",
        reservationTime: "reservation-time",
        exactGuests: "reservation-exact-guests",
      };
      if (firstField) formRef.current?.querySelector<HTMLElement>(`#${ids[firstField]}`)?.focus();
      return;
    }

    const reservation = toReservation(draft);
    setSubmitting(true);
    const result = await submitReservation(reservation);
    setSubmitting(false);

    if (result.outcome === "requested" || result.outcome === "confirmed") {
      setSubmitted({ reservation, confirmed: result.outcome === "confirmed", reference: result.reference });
    } else {
      setNotice(result.outcome);
    }
  };

  const reset = () => {
    setSubmitted(null);
    setDraft(EMPTY_DRAFT);
    setErrors({});
    setNotice(null);
  };

  const isLargeParty = draft.guestChoice === LARGE_PARTY;

  return (
    <div className="rounded-[1.5rem] border border-[#d4b283]/70 bg-[#191207] px-4 py-5 md:px-6 md:py-6 lg:rounded-[1.75rem] lg:px-[2.125rem] lg:pb-[2.5rem] lg:pt-[1.8rem]">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <SubmittedPanel key="submitted" submitted={submitted} onReset={reset} />
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            aria-label="Book a table"
            aria-busy={submitting}
            variants={fieldList}
            initial="hidden"
            animate={animate}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-6 lg:grid-cols-[25.1875rem_minmax(0,1fr)] lg:gap-x-[2.6875rem] lg:gap-y-[1.375rem]">
              <Field id="reservation-name" label="Full Name" Icon={UserRound} error={errors.fullName}>
                <input
                  id="reservation-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Enter your name"
                  value={draft.fullName}
                  aria-required="true"
                  aria-invalid={Boolean(errors.fullName) || undefined}
                  aria-describedby={errors.fullName ? "reservation-name-error" : undefined}
                  onChange={(event) => update("fullName", event.target.value)}
                  onBlur={() => validateField("fullName")}
                  className={`${CONTROL} ${CONTROL_NARROW} ${borderFor(Boolean(errors.fullName))}`}
                />
              </Field>

              <Field id="reservation-phone" label="Phone Number" Icon={Phone} error={errors.phoneNumber}>
                <input
                  id="reservation-phone"
                  type="tel"
                  name="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="Enter phone number"
                  value={draft.phoneNumber}
                  aria-required="true"
                  aria-invalid={Boolean(errors.phoneNumber) || undefined}
                  aria-describedby={errors.phoneNumber ? "reservation-phone-error" : undefined}
                  onChange={(event) => update("phoneNumber", event.target.value)}
                  onBlur={() => validateField("phoneNumber")}
                  className={`${CONTROL} ${CONTROL_NARROW} ${borderFor(Boolean(errors.phoneNumber))}`}
                />
              </Field>

              <Field id="reservation-date" label="Date" Icon={CalendarDays} error={errors.reservationDate}>
                <DateControl
                  value={draft.reservationDate}
                  min={today || undefined}
                  invalid={Boolean(errors.reservationDate)}
                  onChange={(value) => update("reservationDate", value)}
                  onBlur={() => validateField("reservationDate")}
                />
              </Field>

              <Field id="reservation-time" label="Time" Icon={Clock} error={errors.reservationTime}>
                <ReservationSelect
                  id="reservation-time"
                  value={draft.reservationTime}
                  options={timeOptions}
                  placeholder="Select time"
                  invalid={Boolean(errors.reservationTime)}
                  describedBy={errors.reservationTime ? "reservation-time-error" : undefined}
                  className={`${CONTROL} ${CONTROL_NARROW} ${borderFor(Boolean(errors.reservationTime))}`}
                  onChange={(value) => update("reservationTime", value)}
                />
              </Field>

              <Field id="reservation-guests" label="Number of Guests" Icon={UsersRound} error={errors.exactGuests}>
                <ReservationSelect
                  id="reservation-guests"
                  value={draft.guestChoice}
                  options={GUEST_OPTIONS}
                  describedBy={errors.exactGuests ? "reservation-guests-error" : undefined}
                  className={`${CONTROL} ${CONTROL_NARROW} ${borderFor(false)}`}
                  onChange={(value) => update("guestChoice", value)}
                />
                <AnimatePresence initial={false}>
                  {isLargeParty && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden p-[3px] -mx-[3px]"
                    >
                      <label
                        htmlFor="reservation-exact-guests"
                        className="mb-1.5 mt-2 block text-[0.9375rem] text-white lg:text-[1.05rem]"
                      >
                        Exact number of guests <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="reservation-exact-guests"
                        type="number"
                        inputMode="numeric"
                        min={MAX_LISTED_GUESTS + 1}
                        placeholder={`${MAX_LISTED_GUESTS + 1} or more`}
                        value={draft.exactGuests}
                        aria-required="true"
                        aria-invalid={Boolean(errors.exactGuests) || undefined}
                        aria-describedby={errors.exactGuests ? "reservation-guests-error" : undefined}
                        onChange={(event) => update("exactGuests", event.target.value)}
                        onBlur={() => validateField("exactGuests")}
                        className={`${CONTROL} ${CONTROL_NARROW} ${borderFor(Boolean(errors.exactGuests))} [appearance:textfield]`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Field>

              <motion.div variants={fieldReveal} className="md:self-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-champagne group flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full text-lg font-medium text-ink transition-[transform,filter] duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-100 disabled:cursor-wait disabled:hover:scale-100 lg:h-[4.25rem] lg:gap-[0.9rem] lg:text-[1.55rem]"
                >
                  {submitting ? (
                    <>
                      <Loader2 aria-hidden="true" strokeWidth={1.75} className="size-5 animate-spin lg:size-[1.6rem]" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Book a Table
                      <ArrowRight
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:size-[1.6rem]"
                      />
                    </>
                  )}
                </button>
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {notice && (
                <motion.div
                  key={notice}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 flex gap-2.5 rounded-[0.75rem] border border-[#ec8d78]/60 bg-[#2a1610] p-3 text-[0.9375rem] leading-snug text-[#fbd9cf] lg:mt-[1.25rem] lg:p-[0.9rem] lg:text-[1.1rem]">
                    <CircleAlert aria-hidden="true" strokeWidth={1.5} className="mt-px size-5 shrink-0 text-[#f5a896]" />
                    {notice === "not-connected"
                      ? "Online booking isn't connected yet, so this request was not sent and no table is reserved. Your details are still here."
                      : "We couldn't send your request, so no table is reserved yet. Your details are still here. Please try again."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
