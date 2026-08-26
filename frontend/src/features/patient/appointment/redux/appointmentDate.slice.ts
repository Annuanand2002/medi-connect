import { createSlice } from "@reduxjs/toolkit";
import { fetchAvailableDates } from "./getDates.Thunk";
import type { AppointmentDateState } from "../type/appointmentDate";


const initialState: AppointmentDateState = {
  dates: [],
  isLoading: false,
  error: null,
  startDate: null,
  endDate: null,
};

const appointmentDateSlice = createSlice({
  name: "appointmentDate",

  initialState,

  reducers: {
    clearAvailableDates: (state) => {
      state.dates = [];
      state.error = null;
      state.startDate = null;
      state.endDate = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableDates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchAvailableDates.fulfilled, (state, action) => {
        state.isLoading = false;

        state.dates = action.payload.dates;
        state.startDate = action.payload.startDate;
        state.endDate = action.payload.endDate;
      })

      .addCase(fetchAvailableDates.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          "Failed to fetch available dates";
      });
  },
});

export const { clearAvailableDates } =
  appointmentDateSlice.actions;

export default appointmentDateSlice.reducer;