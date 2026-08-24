import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppThunkConfig } from "@/app/store";
import type { Question } from "@/entities/question";
import { HttpError } from "@/shared/api";
import { fetchQuestionsByDate } from "../questions-list.service";

const FALLBACK_ERROR = "Не удалось загрузить вопросы. Попробуйте ещё раз.";

export const fetchQuestions = createAsyncThunk<
  Question[],
  string,
  AppThunkConfig
>(
  "questionsList/fetchQuestions",
  async (fromDate, { signal, rejectWithValue }) => {
    try {
      return await fetchQuestionsByDate(fromDate, signal);
    } catch (error) {
      if (error instanceof HttpError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(
        error instanceof Error && error.message
          ? error.message
          : FALLBACK_ERROR,
      );
    }
  },
);
