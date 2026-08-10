import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Doctor } from "../types/authAdmin.type";

interface AuthState {
  doctor : Doctor | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  doctor: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authDoctorSlice = createSlice({
  name: "authDOctor",
  initialState,
  reducers: {
    loginDoctorSuccess: (
      state,
      action: PayloadAction<{
        doctor: Doctor;
        accessToken: string;
      }>,
    ) => {
      state.doctor = action.payload.doctor;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logoutDoctor: (state) => {
      state.doctor = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setDoctorAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    finishDoctorLoading: (state) => {
      state.isLoading = false;
    },
  },
});
export const { loginDoctorSuccess, logoutDoctor, setDoctorAccessToken, finishDoctorLoading } =
  authDoctorSlice.actions;
export default authDoctorSlice.reducer;
