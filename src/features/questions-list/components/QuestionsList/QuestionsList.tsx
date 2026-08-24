import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { StatusMessage } from "@/shared/ui";
import { useQuestionsList } from "../../questions-list.lib";
import { QuestionItem } from "../QuestionItem/QuestionItem";
import { DRAG_ACTIVATION_DISTANCE_PX } from "../../question-list.constants";

export const QuestionsList = () => {
  const {
    questions,
    status,
    error,
    isLoading,
    isEmpty,
    expandedId,
    swapCandidateId,
    listRef,
    toggleExpanded,
    requestSwap,
    incrementScore,
    decrementScore,
    moveQuestionTo,
  } = useQuestionsList();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: DRAG_ACTIVATION_DISTANCE_PX },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }

    moveQuestionTo(Number(active.id), Number(over.id));
  };

  if (isLoading) {
    return (
      <StatusMessage
        icon={<CircularProgress size={32} />}
        title="Загружаем вопросы"
        description="Запрашиваем данные у Stack Exchange API"
      />
    );
  }

  if (error) {
    return (
      <Alert severity="error" icon={<ErrorOutlineIcon />}>
        <AlertTitle>Не удалось загрузить вопросы</AlertTitle>
        {error}
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <StatusMessage
        icon={<SearchOffIcon fontSize="large" color="disabled" />}
        title="По выбранной дате вопросов не найдено"
        description="Выберите более раннюю дату и повторите поиск."
      />
    );
  }

  if (status === "idle") {
    return null;
  }

  return (
    <Box ref={listRef}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions.map(({ id }) => id)}
          strategy={verticalListSortingStrategy}
        >
          <Stack
            component="ul"
            spacing={1.5}
            sx={{ listStyle: "none", m: 0, p: 0 }}
          >
            {questions.map((question) => (
              <Box component="li" key={question.id}>
                <QuestionItem
                  question={question}
                  isExpanded={expandedId === question.id}
                  isSwapCandidate={swapCandidateId === question.id}
                  onToggleExpanded={toggleExpanded}
                  onRequestSwap={requestSwap}
                  onIncrementScore={incrementScore}
                  onDecrementScore={decrementScore}
                />
              </Box>
            ))}
          </Stack>
        </SortableContext>
      </DndContext>
    </Box>
  );
};
