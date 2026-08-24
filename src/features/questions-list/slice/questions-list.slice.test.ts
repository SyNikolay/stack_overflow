import { describe, expect, it } from "vitest";
import { makeQuestion } from "@/test/question.factory";
import type { QuestionsListState } from "../questions-list.types";
import {
  questionMoved,
  questionSwapRequested,
  questionsListInitialState,
  questionsListReducer,
} from "./questions-list.slice";

const FROM_DATE = "2026-01-01";

const first = makeQuestion({ id: 1, title: "Первый", score: 10 });
const second = makeQuestion({
  id: 2,
  title: "Второй",
  score: 5,
  isAnswered: true,
});
const third = makeQuestion({ id: 3, title: "Третий", score: 1 });

const loadedState = (
  overrides: Partial<QuestionsListState> = {},
): QuestionsListState => ({
  ...questionsListInitialState,
  items: [first, second, third],
  status: "succeeded",
  appliedDate: FROM_DATE,
  ...overrides,
});

const ids = (state: QuestionsListState) => state.items.map(({ id }) => id);

describe("questionsListReducer", () => {
  describe("порядок элементов (drag-and-drop)", () => {
    it("переносит вопрос на позицию другого", () => {
      const state = questionsListReducer(
        loadedState(),
        questionMoved({ activeId: 1, overId: 3 }),
      );

      expect(ids(state)).toEqual([2, 3, 1]);
    });
  });

  describe("обмен по двойному клику", () => {
    it("второй двойной клик по другому вопросу меняет их местами и снимает выделение", () => {
      const withCandidate = questionsListReducer(
        loadedState(),
        questionSwapRequested(1),
      );
      const state = questionsListReducer(
        withCandidate,
        questionSwapRequested(3),
      );

      expect(ids(state)).toEqual([3, 2, 1]);
      expect(state.swapCandidateId).toBeNull();
    });
  });
});
