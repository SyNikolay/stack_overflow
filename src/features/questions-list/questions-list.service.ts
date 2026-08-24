import { mapQuestionFromDto, type Question } from "@/entities/question";
import { QuestionService } from "@/entities/question/question.service";

import { appConfig } from "@/shared/config";
import { toUnixSeconds } from "@/shared/lib";

export const fetchQuestionsByDate = async (
  fromDate: string,
  signal?: AbortSignal,
): Promise<Question[]> => {
  const dtos = await QuestionService.searchQuestions({
    intitle: appConfig.searchIntitle,
    fromDate: toUnixSeconds(fromDate),
    pageSize: appConfig.searchPageSize,
    signal,
  });

  return dtos.map(mapQuestionFromDto);
};
