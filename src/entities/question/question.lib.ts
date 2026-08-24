import type { QuestionDto, ShallowUserDto } from "@/shared/api";
import type { Question, QuestionOwner } from "./question.types";

const UNKNOWN_OWNER_NAME = "Автор скрыт";

const mapOwner = (owner: ShallowUserDto | undefined): QuestionOwner => ({
  displayName: owner?.display_name ?? UNKNOWN_OWNER_NAME,
  reputation: typeof owner?.reputation === "number" ? owner.reputation : null,
  profileImage: owner?.profile_image ?? null,
  link: owner?.link ?? null,
});

export const mapQuestionFromDto = (dto: QuestionDto): Question => ({
  id: dto.question_id,
  title: dto.title,
  score: dto.score,
  isAnswered: dto.is_answered,
  viewCount: dto.view_count,
  answerCount: dto.answer_count,
  createdAt: dto.creation_date,
  lastActivityAt: dto.last_activity_date,
  link: dto.link,
  tags: dto.tags ?? [],
  owner: mapOwner(dto.owner),
});
