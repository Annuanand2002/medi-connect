import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAppointmentHistory } from "./appointmentHistory.thunk";
import type { AppointmentStatus, PatientAppointment } from "../type/appointmentList";

interface AppointmentHistoryState {
  appointments: PatientAppointment[];

  page: number;
  limit: number;
  total: number;
  totalPages: number;

  search: string;
  status: AppointmentStatus | undefined;

  isLoading: boolean;
  error: string | null;
}

const initialState: AppointmentHistoryState = {
  appointments: [],

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,

  search: "",
  status: undefined,

  isLoading: false,
  error: null,
};

const appointmentHistorySlice = createSlice({
  name: "appointmentHistory",

  initialState,

  reducers: {
    setPage: (state, action:PayloadAction<number>) => {
      state.page = action.payload;
    },

    setSearch: (state, action:PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },

    setStatus: (state, action:PayloadAction<AppointmentStatus | undefined>) => {
      state.status = action.payload;
      state.page = 1;
    },

    clearAppointmentError: (state) => {
      state.error = null;
    },

    clearAppointments: (state) => {
      state.appointments = [];
      state.page = 1;
      state.total = 0;
      state.totalPages = 0;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchAppointmentHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchAppointmentHistory.fulfilled, (state, action) => {
        state.isLoading = false;

        state.appointments = action.payload.requests;

        state.page = action.payload.page;

        state.limit = action.payload.limit;

        state.total = action.payload.total;

        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchAppointmentHistory.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload || "Failed to fetch appointment history";
      });
  },
});

export const {
  setPage,
  setSearch,
  setStatus,
  clearAppointmentError,
  clearAppointments,
} = appointmentHistorySlice.actions;

export default appointmentHistorySlice.reducer;
