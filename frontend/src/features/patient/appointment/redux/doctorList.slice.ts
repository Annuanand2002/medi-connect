import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Doctor } from "../type/getDoctorList";
import { fetchListDoctors } from "./doctorList.thunk";


interface DoctorState {
  doctors: Doctor[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "patientDoctors",

  initialState,

  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    clearDoctorError: (state) => {
      state.error = null;
    },

    clearDoctors: (state) => {
      state.doctors = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.totalPages = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchListDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchListDoctors.fulfilled, (state, action) => {
        state.isLoading = false;

        state.doctors = action.payload.doctors;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchListDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch doctors";
      });
  },
});

export const { setPage, clearDoctorError, clearDoctors } = doctorSlice.actions;

export default doctorSlice.reducer;
