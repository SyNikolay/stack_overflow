import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { fromIsoDate } from "@/shared/lib";
import { isSearchNeeded, toStoredDate } from "./questions-search.utils";
import { dateSelected, selectSelectedDate } from "./slice";

export const useQuestionsSearch = (appliedDate: string | null) => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectSelectedDate);

  const selectedDateValue = useMemo(
    () => fromIsoDate(selectedDate),
    [selectedDate],
  );

  const selectDate = useCallback(
    (date: Date | null) => {
      const stored = toStoredDate(date);

      if (stored) {
        dispatch(dateSelected(stored));
      }
    },
    [dispatch],
  );

  return {
    selectedDate,
    selectedDateValue,
    isSearchNeeded: isSearchNeeded(selectedDate, appliedDate),
    selectDate,
  };
};
