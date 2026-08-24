import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuestionsListState } from "../questions-list.types";
import {
  changeQuestionScore,
  findQuestionIndex,
  moveQuestion,
  swapQuestions,
} from "../questions-list.utils";
import { fetchQuestions } from "./questions-list.actions";

const UNKNOWN_ERROR = "Неизвестная ошибка при загрузке вопросов.";

export const questionsListInitialState: QuestionsListState = {
  items: [],
  status: "idle",
  error: null,
  appliedDate: null,
  expandedId: null,
  swapCandidateId: null,
};

export const questionsListSlice = createSlice({
  name: "questionsList",
  initialState: questionsListInitialState,
  reducers: {
    scoreIncremented: (state, { payload: id }: PayloadAction<number>) => {
      state.items = changeQuestionScore(state.items, id, 1);
    },

    scoreDecremented: (state, { payload: id }: PayloadAction<number>) => {
      state.items = changeQuestionScore(state.items, id, -1);
    },

    questionMoved: (
      state,
      { payload }: PayloadAction<{ activeId: number; overId: number }>,
    ) => {
      state.items = moveQuestion(state.items, payload.activeId, payload.overId);
    },

    questionSwapRequested: (state, { payload: id }: PayloadAction<number>) => {
      if (findQuestionIndex(state.items, id) === -1) {
        return;
      }

      if (state.swapCandidateId === null) {
        state.swapCandidateId = id;
        return;
      }

      if (state.swapCandidateId === id) {
        state.swapCandidateId = null;
        return;
      }

      state.items = swapQuestions(state.items, state.swapCandidateId, id);
      state.swapCandidateId = null;
    },

    questionExpandToggled: (state, { payload: id }: PayloadAction<number>) => {
      state.expandedId = state.expandedId === id ? null : id;
    },

    outsideClicked: (state) => {
      state.expandedId = null;
      state.swapCandidateId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, { payload, meta }) => {
        state.status = "succeeded";
        state.error = null;
        state.items = payload;
        state.appliedDate = meta.arg;
        state.expandedId = null;
        state.swapCandidateId = null;
      })
      .addCase(fetchQuestions.rejected, (state, { payload, error, meta }) => {
        if (meta.aborted) {
          return;
        }

        state.status = "failed";
        state.error = payload ?? error.message ?? UNKNOWN_ERROR;
        state.items = [];
        state.expandedId = null;
        state.swapCandidateId = null;
      });
  },
});

export const questionsListReducer = questionsListSlice.reducer;

export const {
  scoreIncremented,
  scoreDecremented,
  questionMoved,
  questionSwapRequested,
  questionExpandToggled,
  outsideClicked,
} = questionsListSlice.actions;
