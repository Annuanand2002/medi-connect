import { createSlice } from "@reduxjs/toolkit";
import type { AppointmentDoctorDateState } from "../types/appointmentDate";
import { fetchDoctorRescheduleAvailableDates } from "./reschdeuleDate.thunk";

const initialState: AppointmentDoctorDateState = {
  dates: [],
  isLoading: false,
  error: null,
  startDate: null,
  endDate: null,
};

const appointmentDoctorDateSlice = createSlice({
  name: "appointmentDoctorDate",

  initialState,

  reducers: {
    clearDoctorAvailableDates: (state) => {
      state.dates = [];
      state.error = null;
      state.startDate = null;
      state.endDate = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // DOCTOR RESCHEDULE
      .addCase(fetchDoctorRescheduleAvailableDates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        fetchDoctorRescheduleAvailableDates.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.dates = action.payload.dates;
          state.startDate = action.payload.startDate;
          state.endDate = action.payload.endDate;
        },
      )

      .addCase(
        fetchDoctorRescheduleAvailableDates.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error =
            (action.payload as string) ||
            "Failed to fetch doctor reschedule available dates";
        },
      );
  },
});

export const { clearDoctorAvailableDates } = appointmentDoctorDateSlice.actions;

export default appointmentDoctorDateSlice.reducer;
