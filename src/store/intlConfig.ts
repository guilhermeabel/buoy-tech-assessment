import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "store";

export interface IntlData {
  locale: "es" | "en";
}

const initialState: IntlData = {
  locale: "en",
};

const intlConfigSlice = createSlice({
  name: "intlConfig",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state, action: PayloadAction<IntlData>) => {
      const { payload } = action;
      state.locale = payload.locale;
    },
  },
});

const { update } = intlConfigSlice.actions;

export const updateIntlConfig =
  (intlConfigData: IntlData): AppThunk =>
  (dispatch) => {
    dispatch(update(intlConfigData));
  };

export const getIntlConfig = (state: RootState) => state.intlConfig;

export const intlConfigReducer = intlConfigSlice.reducer;
