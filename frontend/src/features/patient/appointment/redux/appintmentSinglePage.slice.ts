import { createSlice } from "@reduxjs/toolkit";
import type { AppointmentSinglePage } from "../type/appointmentSinglePage";
import { fetchSingleAppointment } from "./appointmentSinglePage";

interface AppointmentState {
  singleAppointment: AppointmentSinglePage | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  singleAppointment: null,
  isLoading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointmentSinglePage",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleAppointment = action.payload;
      })
      .addCase(fetchSingleAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default appointmentSlice.reducer;
