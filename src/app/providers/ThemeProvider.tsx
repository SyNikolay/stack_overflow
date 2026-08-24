import type { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ru } from "date-fns/locale";
import { cssTokens, theme } from "@/shared/ui";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles styles={{ ":root": cssTokens }} />
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      {children}
    </LocalizationProvider>
  </MuiThemeProvider>
);
