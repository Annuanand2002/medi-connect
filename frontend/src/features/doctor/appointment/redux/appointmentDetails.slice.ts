import { createSlice } from "@reduxjs/toolkit";
import type { SingleAppointmentDetails } from "../types/appointmentHistory";
import { fetchAppointmentDetails } from "./appointmentSinglePage.thunk";


interface AppointmentState {
  singleAppointment: SingleAppointmentDetails | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  singleAppointment: null,
  isLoading: false,
  error: null,
};

const appointmentDetailsSlice = createSlice({
  name: "appointmentDetailsPage",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleAppointment = action.payload;
      })
      .addCase(fetchAppointmentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default appointmentDetailsSlice.reducer;
