import type { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

export interface AppThunkConfig {
  state: RootState;
  rejectValue: string;
}
