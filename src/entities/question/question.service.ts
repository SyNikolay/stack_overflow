import { appConfig } from "@/shared/config";

import {
  apiService,
  HttpError,
  type QuestionDto,
  type SearchQuestionsParams,
  type StackExchangeWrapper,
} from "@/shared/api";

export const QuestionService = {
  searchQuestions: async ({
    intitle,
    fromDate,
    pageSize,
    signal,
  }: SearchQuestionsParams): Promise<QuestionDto[]> => {
    const wrapper = await apiService<StackExchangeWrapper<QuestionDto>>(
      `${appConfig.apiUrl}/search`,
      {
        params: {
          site: appConfig.site,
          intitle,
          fromdate: fromDate,
          pagesize: pageSize,
          sort: "votes",
          order: "desc",
          key: appConfig.apiKey || undefined,
        },
        signal,
      },
    );

    if (wrapper.error_message) {
      throw new HttpError(wrapper.error_message);
    }

    return wrapper.items ?? [];
  },
};
