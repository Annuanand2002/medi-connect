import { createSlice } from "@reduxjs/toolkit";
import type { AvailableTimeSlot } from "../type/appointmentTime";
import { fetchTimeSlots } from "./appointmentSlot.thunk";
import { fetchRescheduleTimeSlots } from "./reschdeuleSlot.thunk";

interface TimeSlotState {
  slots: AvailableTimeSlot[];
  selectedDate: string | null;
  selectedStartTime: string | null;
  selectedEndTime: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TimeSlotState = {
  slots: [],
  selectedDate: null,
  selectedStartTime: null,
  selectedEndTime: null,
  isLoading: false,
  error: null,
};

const timeSlotSlice = createSlice({
  name: "timeSlots",

  initialState,

  reducers: {
    selectTimeSlot: (state, action) => {
      state.selectedStartTime = action.payload.startTime;
      state.selectedEndTime = action.payload.endTime;
    },

    clearTimeSlots: (state) => {
      state.slots = [];
      state.selectedDate = null;
      state.selectedStartTime = null;
      state.selectedEndTime = null;
      state.error = null;
    },

    clearSelectedTime: (state) => {
      state.selectedStartTime = null;
      state.selectedEndTime = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // NORMAL BOOKING
      .addCase(fetchTimeSlots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.slots = [];
        state.selectedStartTime = null;
        state.selectedEndTime = null;
      })

      .addCase(fetchTimeSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.slots = action.payload.slots;
        state.selectedDate = action.payload.date;
      })

      .addCase(fetchTimeSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.slots = [];
        state.error = action.payload || "Failed to fetch time slots";
      })

      // RESCHEDULE
      .addCase(fetchRescheduleTimeSlots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.slots = [];
        state.selectedStartTime = null;
        state.selectedEndTime = null;
      })

      .addCase(fetchRescheduleTimeSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.slots = action.payload.slots;
        state.selectedDate = action.payload.date;
      })

      .addCase(fetchRescheduleTimeSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.slots = [];
        state.error = action.payload || "Failed to fetch reschedule time slots";
      });
  },
});

export const { selectTimeSlot, clearTimeSlots, clearSelectedTime } =
  timeSlotSlice.actions;

export default timeSlotSlice.reducer;
