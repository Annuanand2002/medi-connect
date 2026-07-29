import { createSlice } from "@reduxjs/toolkit";
import { getRetryDoctorRequestThunk } from "./retryDoctor.thunk";
import type { RetryDoctorRequest } from "../../../entites/doctor/retryDoctorRequest.type";

interface RetryDoctorState {
  loading: boolean;
  retryRequest: RetryDoctorRequest | null;
  error: string | null;
}

const initialState: RetryDoctorState = {
  loading: false,
  retryRequest: null,
  error: null,
};

const retryDoctorSlice = createSlice({
  name: "retryDoctor",
  initialState,
  reducers: {
    clearRetryDoctor(state) {
      state.retryRequest = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRetryDoctorRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRetryDoctorRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.retryRequest = action.payload;
      })
      .addCase(getRetryDoctorRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ??
          action.error.message ??
          "Failed to fetch retry request.";
      });
  },
});

export const { clearRetryDoctor } = retryDoctorSlice.actions;

export default retryDoctorSlice.reducer;
