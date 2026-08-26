import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  DoctorAppointment,
} from "../types/appointmentHistory";
import { fetchDoctorAppointment } from "./appointment.thunk";

interface DoctorAppointmentState {
  appointments: DoctorAppointment[];

  page: number;
  limit: number;
  total: number;
  totalPages: number;

  search: string;
  date: string | undefined;

  isLoading: boolean;
  error: string | null;
}

const initialState: DoctorAppointmentState = {
  appointments: [],

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,

  search: "",
  date: undefined,

  isLoading: false,
  error: null,
};

const doctorAppointmentSlice = createSlice({
  name: "doctorAppointment",

  initialState,

  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },

    setDate: (state, action: PayloadAction<string | undefined>) => {
      state.date = action.payload;
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

      .addCase(fetchDoctorAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchDoctorAppointment.fulfilled, (state, action) => {
        state.isLoading = false;

        state.appointments = action.payload.requests;

        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;

        state.error = null;
      })

      .addCase(fetchDoctorAppointment.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
          action.payload ||
          "Failed to fetch doctor appointments";
      });
  },
});

export const {
  setPage,
  setSearch,
  setDate,
  clearAppointmentError,
  clearAppointments,
} = doctorAppointmentSlice.actions;

export default doctorAppointmentSlice.reducer;