import { createTheme } from "@mui/material/styles";
import {
  cssTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
} from "./tokens";

declare module "@mui/material/styles" {
  interface Palette {
    answered: { main: string; surface: string; contrastText: string };
    swapSelected: { main: string; surface: string };
  }

  interface PaletteOptions {
    answered: { main: string; surface: string; contrastText: string };
    swapSelected: { main: string; surface: string };
  }
}

export const theme = createTheme({
  spacing: spacingTokens.base,
  shape: { borderRadius: radiusTokens.base },
  palette: {
    mode: "light",
    primary: {
      main: cssTokens["--primary"],
      dark: cssTokens["--primary-hover"],
      contrastText: cssTokens["--primary-foreground"],
    },
    error: {
      main: cssTokens["--destructive"],
      light: cssTokens["--destructive-surface"],
    },
    success: {
      main: cssTokens["--answered"],
      dark: cssTokens["--answered-foreground"],
    },
    divider: cssTokens["--border"],
    background: {
      default: cssTokens["--background"],
      paper: cssTokens["--card"],
    },
    text: {
      primary: cssTokens["--foreground"],
      secondary: cssTokens["--muted-foreground"],
    },
    answered: {
      main: cssTokens["--answered"],
      surface: cssTokens["--answered-surface"],
      contrastText: cssTokens["--answered-foreground"],
    },
    swapSelected: {
      main: cssTokens["--selected"],
      surface: cssTokens["--selected-surface"],
    },
  },
  typography: {
    fontFamily: typographyTokens.fontFamily,
    h1: { fontSize: "1.75rem", fontWeight: typographyTokens.weight.bold },
    h2: { fontSize: "1.25rem", fontWeight: typographyTokens.weight.semibold },
    button: { fontWeight: typographyTokens.weight.semibold },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: "none" } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
  },
});
