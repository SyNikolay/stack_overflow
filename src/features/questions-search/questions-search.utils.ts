import { toIsoDate } from "@/shared/lib";

export const isSearchNeeded = (
  selectedDate: string,
  appliedDate: string | null,
): boolean => Boolean(selectedDate) && selectedDate !== appliedDate;

export const toStoredDate = (date: Date | null): string | null => {
  if (!date || Number.isNaN(date.getTime())) {
    return null;
  }

  return toIsoDate(date);
};
