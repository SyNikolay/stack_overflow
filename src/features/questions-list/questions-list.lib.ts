import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useClickOutside } from "@/shared/lib";
import {
  outsideClicked,
  questionExpandToggled,
  questionMoved,
  questionSwapRequested,
  scoreDecremented,
  scoreIncremented,
  selectExpandedQuestionId,
  selectIsQuestionsEmpty,
  selectIsQuestionsLoading,
  selectQuestions,
  selectQuestionsError,
  selectQuestionsStatus,
  selectSwapCandidateId,
} from "./slice";

export const useQuestionsList = () => {
  const dispatch = useAppDispatch();

  const questions = useAppSelector(selectQuestions);
  const status = useAppSelector(selectQuestionsStatus);
  const error = useAppSelector(selectQuestionsError);
  const isLoading = useAppSelector(selectIsQuestionsLoading);
  const isEmpty = useAppSelector(selectIsQuestionsEmpty);
  const expandedId = useAppSelector(selectExpandedQuestionId);
  const swapCandidateId = useAppSelector(selectSwapCandidateId);

  const hasActiveSelection = expandedId !== null || swapCandidateId !== null;

  const listRef = useClickOutside<HTMLDivElement>(() => {
    if (hasActiveSelection) {
      dispatch(outsideClicked());
    }
  });

  const toggleExpanded = useCallback(
    (id: number) => dispatch(questionExpandToggled(id)),
    [dispatch],
  );

  const requestSwap = useCallback(
    (id: number) => dispatch(questionSwapRequested(id)),
    [dispatch],
  );

  const incrementScore = useCallback(
    (id: number) => dispatch(scoreIncremented(id)),
    [dispatch],
  );

  const decrementScore = useCallback(
    (id: number) => dispatch(scoreDecremented(id)),
    [dispatch],
  );

  const moveQuestionTo = useCallback(
    (activeId: number, overId: number) =>
      dispatch(questionMoved({ activeId, overId })),
    [dispatch],
  );

  return {
    questions,
    status,
    error,
    isLoading,
    isEmpty,
    expandedId,
    swapCandidateId,
    listRef,
    toggleExpanded,
    requestSwap,
    incrementScore,
    decrementScore,
    moveQuestionTo,
  };
};
