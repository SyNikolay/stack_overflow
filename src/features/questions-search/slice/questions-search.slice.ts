import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { appConfig } from "@/shared/config";
import type { QuestionsSearchState } from "../questions-search.types";

export const questionsSearchInitialState: QuestionsSearchState = {
  selectedDate: appConfig.defaultFromDate,
};

export const questionsSearchSlice = createSlice({
  name: "questionsSearch",
  initialState: questionsSearchInitialState,
  reducers: {
    dateSelected: (state, { payload }: PayloadAction<string>) => {
      state.selectedDate = payload;
    },
  },
});

export const questionsSearchReducer = questionsSearchSlice.reducer;

export const { dateSelected } = questionsSearchSlice.actions;
