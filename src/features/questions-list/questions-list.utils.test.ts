import { describe, expect, it } from "vitest";
import { makeQuestion } from "@/test/question.factory";
import { moveQuestion, swapQuestions } from "./questions-list.utils";

const items = [
  makeQuestion({ id: 1, score: 10 }),
  makeQuestion({ id: 2, score: 5 }),
  makeQuestion({ id: 3, score: 1 }),
];

describe("moveQuestion", () => {
  it("переносит вопрос на место другого", () => {
    const result = moveQuestion(items, 1, 3);

    expect(result.map(({ id }) => id)).toEqual([2, 3, 1]);
  });
});

describe("swapQuestions", () => {
  it("меняет вопросы местами", () => {
    const result = swapQuestions(items, 1, 3);

    expect(result.map(({ id }) => id)).toEqual([3, 2, 1]);
  });
});
