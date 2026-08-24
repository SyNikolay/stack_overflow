import { combineReducers } from "@reduxjs/toolkit";
import {
  questionsListReducer,
  questionsListSlice,
} from "@/features/questions-list/slice";
import {
  questionsSearchSlice,
  questionsSearchReducer,
} from "@/features/questions-search/slice";

export const rootReducer = combineReducers({
  [questionsListSlice.name]: questionsListReducer,
  [questionsSearchSlice.name]: questionsSearchReducer,
});
