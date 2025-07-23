import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./index";

export interface EnvironmentConfigData {
  loading?: boolean;
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  appId?: string;
  measurementId?: string;
  messagingSenderId?: string;
  storageBucket?: string;
  verificationEmailRedirectUri?: string;
}

const initialState: EnvironmentConfigData = {
  loading: true,
};

const environmentConfigSlice = createSlice({
  name: "environmentConfig",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state, action: PayloadAction<EnvironmentConfigData>) => {
      const { payload } = action;
      state.apiKey = payload.apiKey;
      state.authDomain = payload.authDomain;
      state.projectId = payload.projectId;
      state.appId = payload.appId;
      state.measurementId = payload.measurementId;
      state.messagingSenderId = payload.messagingSenderId;
      state.storageBucket = payload.storageBucket;
      state.verificationEmailRedirectUri = payload.verificationEmailRedirectUri;
      state.loading = false;
    },
  },
});

const { update } = environmentConfigSlice.actions;

export const updateEnvironmentConfig =
  (environmentConfigData: EnvironmentConfigData): AppThunk =>
  (dispatch) => {
    dispatch(update(environmentConfigData));
  };

export const getEnvironmentConfig = (state: RootState) =>
  state.environmentConfig;

export default environmentConfigSlice.reducer;
