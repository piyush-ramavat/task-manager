import { format, parseISO } from "date-fns";

export const asDate = (src: Date | string) =>
  typeof src === "string" ? parseISO(src) : src;

export const toFormattedDateString = (date?: Date | string | null) =>
  date ? format(asDate(date), "dd MMM yyyy") : undefined;

export const toFormattedDateTimeString = (date?: Date | string | null) =>
  date ? format(asDate(date), "dd MMM yyyy h:mma") : undefined;
