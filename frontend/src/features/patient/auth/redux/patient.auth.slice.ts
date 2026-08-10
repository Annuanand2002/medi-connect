import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { Patient } from "../types/auth.patient.type";

interface AuthState {
  patient : Patient | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  patient: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authPatientSlice = createSlice({
  name: "authPatient",
  initialState,
  reducers: {
    loginPatientSuccess: (
      state,
      action: PayloadAction<{
        patient: Patient;
        accessToken: string;
      }>,
    ) => {
      state.patient = action.payload.patient;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logoutPatient: (state) => {
      state.patient = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setPatientAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    finishPatientLoading: (state) => {
      state.isLoading = false;
    },
  },
});
export const { loginPatientSuccess, logoutPatient, setPatientAccessToken, finishPatientLoading } =
  authPatientSlice.actions;
export default authPatientSlice.reducer;
