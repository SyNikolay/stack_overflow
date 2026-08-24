import { useCallback, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  QuestionsList,
  fetchQuestions,
  selectAppliedDate,
  selectIsQuestionsLoading,
} from "@/features/questions-list";
import {
  QuestionsSearchPanel,
  selectSelectedDate,
} from "@/features/questions-search";
import { appConfig } from "@/shared/config";

export const QuestionsPage = () => {
  const dispatch = useAppDispatch();
  const appliedDate = useAppSelector(selectAppliedDate);
  const selectedDate = useAppSelector(selectSelectedDate);
  const isLoading = useAppSelector(selectIsQuestionsLoading);

  const isInitialRequestSent = useRef(false);

  useEffect(() => {
    if (isInitialRequestSent.current) {
      return;
    }

    isInitialRequestSent.current = true;
    dispatch(fetchQuestions(selectedDate));
  }, [dispatch, selectedDate]);

  const handleSearch = useCallback(
    (date: string) => {
      dispatch(fetchQuestions(date));
    },
    [dispatch],
  );

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h1" component="h1">
            Популярные вопросы «{appConfig.searchIntitle}»
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Топ-{appConfig.searchPageSize} вопросов Stack Overflow по рейтингу,
            в заголовке которых есть «{appConfig.searchIntitle}». Клик по строке
            раскрывает подробности, двойной клик выбирает вопрос для обмена
            местами, а порядок можно менять перетаскиванием. Данные —{" "}
            <Link
              href="https://api.stackexchange.com/docs"
              target="_blank"
              rel="noopener"
            >
              Stack Exchange API
            </Link>
            .
          </Typography>
        </Stack>

        <QuestionsSearchPanel
          appliedDate={appliedDate}
          isLoading={isLoading}
          onSearch={handleSearch}
        />

        <QuestionsList />
      </Stack>
    </Container>
  );
};
