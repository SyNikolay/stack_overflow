import type { RootState } from "@/app/store";
import type { Question } from "@/entities/question";
import type { QuestionsListStatus } from "../questions-list.types";

const selectState = (state: RootState) => state["questionsList"];

export const selectQuestions = (state: RootState): Question[] =>
  selectState(state).items;

export const selectQuestionsStatus = (state: RootState): QuestionsListStatus =>
  selectState(state).status;

export const selectQuestionsError = (state: RootState): string | null =>
  selectState(state).error;

export const selectAppliedDate = (state: RootState): string | null =>
  selectState(state).appliedDate;

export const selectExpandedQuestionId = (state: RootState): number | null =>
  selectState(state).expandedId;

export const selectSwapCandidateId = (state: RootState): number | null =>
  selectState(state).swapCandidateId;

export const selectIsQuestionsLoading = (state: RootState): boolean =>
  selectState(state).status === "loading";

export const selectIsQuestionsEmpty = (state: RootState): boolean => {
  const { status, items } = selectState(state);

  return status === "succeeded" && items.length === 0;
};
