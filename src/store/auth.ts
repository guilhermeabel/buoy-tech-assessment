import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./index";

export interface AuthData {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthData = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state, action: PayloadAction<AuthData>) => {
      const { payload } = action;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
  },
});

const { update } = authSlice.actions;

export const updateAuth =
  (authData: AuthData): AppThunk =>
  (dispatch) => {
    dispatch(update(authData));
  };

export const getAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
