import type {
  KeyboardEvent,
  KeyboardEventHandler,
  PointerEventHandler,
} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { Question } from "@/entities/question";
import { useClickWithDoubleClick } from "@/shared/lib";
import { token } from "@/shared/ui";
import { QuestionDetails } from "../QuestionDetails/QuestionDetails";
import { QuestionScore } from "../QuestionScore/QuestionScore";

interface QuestionItemProps {
  question: Question;
  isExpanded: boolean;
  isSwapCandidate: boolean;
  onToggleExpanded: (id: number) => void;
  onRequestSwap: (id: number) => void;
  onIncrementScore: (id: number) => void;
  onDecrementScore: (id: number) => void;
}

export const QuestionItem = ({
  question,
  isExpanded,
  isSwapCandidate,
  onToggleExpanded,
  onRequestSwap,
  onIncrementScore,
  onDecrementScore,
}: QuestionItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const dragListeners = listeners as
    | {
        onPointerDown?: PointerEventHandler<HTMLElement>;
        onKeyDown?: KeyboardEventHandler<HTMLElement>;
      }
    | undefined;

  const { handleClick, handleDoubleClick } = useClickWithDoubleClick({
    onClick: () => onToggleExpanded(question.id),
    onDoubleClick: () => onRequestSwap(question.id),
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggleExpanded(question.id);
    }
  };

  return (
    <Paper
      ref={setNodeRef}
      variant="outlined"
      data-testid={`question-item-${question.id}`}
      data-answered={question.isAnswered}
      data-swap-candidate={isSwapCandidate}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onPointerDown={dragListeners?.onPointerDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      sx={{
        p: 1.5,
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
        zIndex: isDragging ? 1 : "auto",
        opacity: isDragging ? 0.9 : 1,
        boxShadow: isDragging
          ? token("--shadow-dragging")
          : token("--shadow-card"),
        bgcolor: question.isAnswered ? "answered.surface" : "background.paper",
        borderWidth: isSwapCandidate ? 2 : 1,
        borderColor: isSwapCandidate
          ? "swapSelected.main"
          : question.isAnswered
            ? "answered.main"
            : "divider",
        "&:hover": {
          borderColor: isSwapCandidate ? "swapSelected.main" : "primary.main",
        },
        "&:focus-visible": {
          outline: `2px solid ${token("--ring")}`,
          outlineOffset: 2,
        },
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
        <Tooltip title="Перетащите">
          <IconButton
            ref={setActivatorNodeRef}
            size="small"
            disableRipple
            {...attributes}
            onKeyDown={dragListeners?.onKeyDown}
            aria-label={`Переместить вопрос «${question.title}»`}
            onClick={(event) => event.stopPropagation()}
            sx={{
              cursor: "grab",
              touchAction: "none",
              color: "text.secondary",
            }}
          >
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <QuestionScore
          score={question.score}
          onIncrement={() => onIncrementScore(question.id)}
          onDecrement={() => onDecrementScore(question.id)}
        />

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            sx={{ fontWeight: 600, lineHeight: 1.35 }}
            dangerouslySetInnerHTML={{ __html: question.title }}
          />

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 1, alignItems: "center", flexWrap: "wrap", rowGap: 1 }}
          >
            {question.isAnswered ? (
              <Chip
                size="small"
                color="success"
                variant="outlined"
                icon={<CheckCircleIcon />}
                label="Есть ответ"
              />
            ) : null}

            {isSwapCandidate ? (
              <Chip
                size="small"
                variant="outlined"
                icon={<SwapVertIcon />}
                label="Выбран для обмена"
                sx={{
                  borderColor: "swapSelected.main",
                  color: "swapSelected.main",
                }}
              />
            ) : null}

            <Typography
              variant="caption"
              color="text.secondary"
              dangerouslySetInnerHTML={{
                __html: question.owner.displayName,
              }}
            />
          </Stack>
        </Box>

        <ExpandMoreIcon
          fontSize="small"
          sx={{
            color: "text.secondary",
            transform: isExpanded ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        />
      </Stack>

      <Collapse in={isExpanded} unmountOnExit>
        <QuestionDetails question={question} />
      </Collapse>
    </Paper>
  );
};
