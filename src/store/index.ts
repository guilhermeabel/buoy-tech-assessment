import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { intlConfigReducer } from "./intlConfig";
import authReducer from "./auth";
import environmentConfigReducer from "./environmentConfig";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    intlConfig: intlConfigReducer,
    environmentConfig: environmentConfigReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
