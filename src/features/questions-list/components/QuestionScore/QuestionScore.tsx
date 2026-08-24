import type { MouseEvent, PointerEvent } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface QuestionScoreProps {
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuestionScore = ({
  score,
  onIncrement,
  onDecrement,
}: QuestionScoreProps) => {
  const stopPointer = (event: PointerEvent<HTMLButtonElement>) =>
    event.stopPropagation();

  const stopMouse = (event: MouseEvent<HTMLButtonElement>) =>
    event.stopPropagation();

  const handle =
    (action: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      action();
    };

  return (
    <Stack sx={{ alignItems: "center", minWidth: 56 }}>
      <IconButton
        size="small"
        aria-label="Увеличить рейтинг"
        onPointerDown={stopPointer}
        onDoubleClick={stopMouse}
        onClick={handle(onIncrement)}
      >
        <KeyboardArrowUpIcon fontSize="small" />
      </IconButton>

      <Typography
        component="output"
        aria-label="Рейтинг"
        sx={{
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1.2,
        }}
      >
        {score}
      </Typography>

      <IconButton
        size="small"
        aria-label="Уменьшить рейтинг"
        onPointerDown={stopPointer}
        onDoubleClick={stopMouse}
        onClick={handle(onDecrement)}
      >
        <KeyboardArrowDownIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};
