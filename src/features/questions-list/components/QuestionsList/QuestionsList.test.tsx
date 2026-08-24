import { describe, expect, it } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { RootState } from "@/app/store";
import { makeQuestion } from "@/test/question.factory";
import { renderWithProviders } from "@/test/render-with-providers";
import { questionsListInitialState } from "../../slice";
import type { QuestionsListState } from "../../questions-list.types";
import { QuestionsList } from "./QuestionsList";

const answered = makeQuestion({
  id: 1,
  title: "Вопрос с ответом",
  score: 10,
  isAnswered: true,
});
const unanswered = makeQuestion({
  id: 2,
  title: "Вопрос без ответа",
  score: 3,
  isAnswered: false,
  viewCount: 4321,
  owner: {
    displayName: "Иван Иванов",
    reputation: 9876,
    profileImage: null,
    link: null,
  },
});
const third = makeQuestion({ id: 3, title: "Третий вопрос", score: 1 });

const preloadedState = (
  overrides: Partial<QuestionsListState> = {},
): Partial<RootState> => ({
  ["questionsList"]: {
    ...questionsListInitialState,
    items: [answered, unanswered, third],
    status: "succeeded",
    appliedDate: "2026-01-01",
    ...overrides,
  },
});

const item = (id: number) => screen.getByTestId(`question-item-${id}`);

const renderedOrder = () =>
  screen
    .getAllByTestId(/^question-item-/)
    .map((element) =>
      element.getAttribute("data-testid")?.replace("question-item-", ""),
    );

describe("QuestionsList", () => {
  it("меняет вопросы местами двойным кликом", async () => {
    const user = userEvent.setup();
    renderWithProviders(<QuestionsList />, {
      preloadedState: preloadedState(),
    });

    await user.dblClick(item(1));

    await waitFor(() =>
      expect(item(1)).toHaveAttribute("data-swap-candidate", "true"),
    );
    expect(within(item(1)).getByText("Выбран для обмена")).toBeInTheDocument();

    await user.dblClick(item(3));

    await waitFor(() => expect(renderedOrder()).toEqual(["3", "2", "1"]));
    expect(item(1)).toHaveAttribute("data-swap-candidate", "false");
    expect(item(3)).toHaveAttribute("data-swap-candidate", "false");
  });
});
