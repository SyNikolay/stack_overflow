import type { Question } from "@/entities/question";
import { moveItem, swapItems } from "@/shared/lib";

export const findQuestionIndex = (
  items: readonly Question[],
  id: number,
): number => items.findIndex((item) => item.id === id);

export const changeQuestionScore = (
  items: readonly Question[],
  id: number,
  delta: number,
): Question[] =>
  items.map((item) =>
    item.id === id ? { ...item, score: item.score + delta } : item,
  );

export const moveQuestion = (
  items: readonly Question[],
  activeId: number,
  overId: number,
): Question[] => {
  const from = findQuestionIndex(items, activeId);
  const to = findQuestionIndex(items, overId);

  if (from === -1 || to === -1) {
    return [...items];
  }

  return moveItem(items, from, to);
};

export const swapQuestions = (
  items: readonly Question[],
  firstId: number,
  secondId: number,
): Question[] => {
  const first = findQuestionIndex(items, firstId);
  const second = findQuestionIndex(items, secondId);

  if (first === -1 || second === -1) {
    return [...items];
  }

  return swapItems(items, first, second);
};
