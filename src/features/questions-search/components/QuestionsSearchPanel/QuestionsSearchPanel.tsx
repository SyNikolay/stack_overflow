import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { formatIsoDateForDisplay } from "@/shared/lib";
import { token } from "@/shared/ui";
import { useQuestionsSearch } from "../../questions-search.lib";
import { DateField } from "../DateField/DateField";

interface QuestionsSearchPanelProps {
  appliedDate: string | null;
  isLoading: boolean;
  onSearch: (date: string) => void;
}

export const QuestionsSearchPanel = ({
  appliedDate,
  isLoading,
  onSearch,
}: QuestionsSearchPanelProps) => {
  const { selectedDate, selectedDateValue, isSearchNeeded, selectDate } =
    useQuestionsSearch(appliedDate);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderColor: token("--border"),
        boxShadow: token("--shadow-card"),
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { xs: "stretch", sm: "center" } }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h2" gutterBottom>
            Вопросы не ранее выбранной даты
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {appliedDate
              ? `Показаны результаты с ${formatIsoDateForDisplay(appliedDate)}`
              : "Результаты ещё не загружены"}
          </Typography>
        </Box>

        <DateField
          label="Дата создания, от"
          value={selectedDateValue}
          disabled={isLoading}
          onChange={selectDate}
        />

        {isSearchNeeded ? (
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            disabled={isLoading}
            onClick={() => onSearch(selectedDate)}
          >
            Поиск
          </Button>
        ) : null}
      </Stack>
    </Paper>
  );
};
