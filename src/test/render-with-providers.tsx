import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { StoreProvider, ThemeProvider } from "@/app/providers";
import { createAppStore, type AppStore, type RootState } from "@/app/store";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState,
    store = createAppStore(preloadedState),
    ...options
  }: RenderWithProvidersOptions = {},
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <StoreProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
};
