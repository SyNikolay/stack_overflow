import type { Question } from "@/entities/question";

let sequence = 0;

export const makeQuestion = (overrides: Partial<Question> = {}): Question => {
  sequence += 1;

  return {
    id: sequence,
    title: `Вопрос №${sequence}`,
    score: 0,
    isAnswered: false,
    viewCount: 100,
    answerCount: 1,
    createdAt: 1_767_225_600,
    lastActivityAt: 1_767_312_000,
    link: `https://stackoverflow.com/questions/${sequence}`,
    tags: ["reactjs", "react-redux"],
    owner: {
      displayName: `Автор ${sequence}`,
      reputation: 1_234,
      profileImage: null,
      link: null,
    },
    ...overrides,
  };
};
