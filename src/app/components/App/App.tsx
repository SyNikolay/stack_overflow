import { StoreProvider, ThemeProvider } from "@/app/providers";
import { QuestionsPage } from "@/pages/questions";

export const App = () => (
  <StoreProvider>
    <ThemeProvider>
      <QuestionsPage />
    </ThemeProvider>
  </StoreProvider>
);
