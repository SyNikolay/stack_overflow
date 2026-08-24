import { format, isValid, parse, startOfDay } from "date-fns";

export const ISO_DATE_FORMAT = "yyyy-MM-dd";
export const DISPLAY_DATE_FORMAT = "dd.MM.yyyy";

export const toIsoDate = (date: Date): string => format(date, ISO_DATE_FORMAT);

export const fromIsoDate = (value: string): Date | null => {
  const parsed = parse(value, ISO_DATE_FORMAT, new Date());

  return isValid(parsed) ? startOfDay(parsed) : null;
};

export const formatIsoDateForDisplay = (value: string): string => {
  const parsed = fromIsoDate(value);

  return parsed ? format(parsed, DISPLAY_DATE_FORMAT) : value;
};

export const toUnixSeconds = (value: string): number => {
  const parsed = fromIsoDate(value);

  if (!parsed) {
    throw new Error(`Некорректная дата: ${value}`);
  }

  return Math.floor(parsed.getTime() / 1000);
};

export const formatUnixSeconds = (seconds: number): string =>
  format(new Date(seconds * 1000), `${DISPLAY_DATE_FORMAT}, HH:mm`);
