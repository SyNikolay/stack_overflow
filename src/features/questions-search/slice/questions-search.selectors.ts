import type { RootState } from "@/app/store";

const selectState = (state: RootState) => state["questionsSearch"];

export const selectSelectedDate = (state: RootState): string =>
  selectState(state).selectedDate;
