import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorRescheduleTimeSlots } from "./reschdeuleTime.thunk";
import type { AppointmentDoctorTimeState } from "../types/appointmentTime";

const initialState: AppointmentDoctorTimeState = {
  timeSlots: [],
  selectedStartTime: null,
  selectedEndTime: null,
  isLoading: false,
  error: null,
};

const appointmentDoctorTimeSlice = createSlice({
  name: "appointmentDoctorTime",
  initialState,

  reducers: {
    selectDoctorTimeSlot: (state, action) => {
      state.selectedStartTime = action.payload.startTime;
      state.selectedEndTime = action.payload.endTime;
    },

    clearDoctorTimeSlot: (state) => {
      state.selectedStartTime = null;
      state.selectedEndTime = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDoctorRescheduleTimeSlots.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.timeSlots = [];

          state.selectedStartTime = null;
          state.selectedEndTime = null;
        },
      )

      .addCase(
        fetchDoctorRescheduleTimeSlots.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.timeSlots = action.payload;
        },
      )

      .addCase(
        fetchDoctorRescheduleTimeSlots.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            (action.payload as string) ||
            "Failed to fetch available time slots";

          state.timeSlots = [];
        },
      );
  },
});

export const {
  selectDoctorTimeSlot,
  clearDoctorTimeSlot,
} = appointmentDoctorTimeSlice.actions;

export default appointmentDoctorTimeSlice.reducer;