import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import type { RootState } from "./store.types";

export const createAppStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState | undefined,
  });

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore["dispatch"];

export const store = createAppStore();
