import { createSlice } from "@reduxjs/toolkit";
import { verifyPatientOTPThunk } from "./verifyOTP.thunk";

interface PatientOtpState {
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientOtpState = {
  isLoading: false,
  error: null,
};

const patientOtpSlice = createSlice({
  name: "patientOtp",
  initialState,

  reducers: {
    clearOtpError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(verifyPatientOTPThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(verifyPatientOTPThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(verifyPatientOTPThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to verify OTP";
      });
  },
});

export const { clearOtpError } = patientOtpSlice.actions;

export default patientOtpSlice.reducer;
