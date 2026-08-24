import type { Question } from "@/entities/question";

export type QuestionsListStatus = "idle" | "loading" | "succeeded" | "failed";

export interface QuestionsListState {
  items: Question[];
  status: QuestionsListStatus;
  error: string | null;
  appliedDate: string | null;
  expandedId: number | null;
  swapCandidateId: number | null;
}
