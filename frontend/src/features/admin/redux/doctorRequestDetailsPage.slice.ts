import { createSlice } from "@reduxjs/toolkit";
import type { DoctorRequestDetails } from "../../../entites/doctor/doctorRequestDetials.types";
import { getDoctorRequestDetailsThunk } from "./doctorRequestDetailsPage.thunk";

interface DoctorRequestDetailsState {
  loading: boolean;
  request: DoctorRequestDetails | null;
  error: string | null;
}

const initialState: DoctorRequestDetailsState = {
  loading: false,
  request: null,
  error: null,
};

const doctorRequestDetailsSlice = createSlice({
  name: "doctorRequestDetails",
  initialState,
  reducers: {
    clearDoctorRequestDetails: (state) => {
      state.request = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDoctorRequestDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDoctorRequestDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload;
      })

      .addCase(getDoctorRequestDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.request = null;
        state.error =
          action.payload?.message ?? "Failed to fetch doctor request.";
      });
  },
});

export const { clearDoctorRequestDetails } = doctorRequestDetailsSlice.actions;

export default doctorRequestDetailsSlice.reducer;
