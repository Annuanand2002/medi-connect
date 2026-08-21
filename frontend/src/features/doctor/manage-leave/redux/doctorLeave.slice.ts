import { createSlice } from "@reduxjs/toolkit";

import type { DoctorLeave } from "../types/doctorLeave.type";

import { fetchDoctorLeave } from "./getDoctorLeave.thubk";
import { createDoctorLeaveThunk } from "./addLeave.thunk";
import { updateDoctorLeaveThunk } from "./updateLeave.thunk";
import { deleteDoctorLeaveThunk } from "./deleteThunk";

interface DoctorLeaveState {
  leaves: DoctorLeave[];

  isLoading: boolean;
  error: string | null;

  isCreating: boolean;
  createError: string | null;

  isUpdating: boolean;
  updateError: string | null;

  isDeleting: boolean;
  deleteError: string | null;

  page: number;
  limit: number;
  total: number;
  totalPages: number;

  search: string;
  date?: string;
}

const initialState: DoctorLeaveState = {
  leaves: [],

  isLoading: false,
  error: null,

  isCreating: false,
  createError: null,

  isUpdating: false,
  updateError: null,

  isDeleting: false,
  deleteError: null,

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,

  search: "",
  date: undefined,
};

const doctorLeaveSlice = createSlice({
  name: "doctorLeave",

  initialState,

  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },

    setDate: (state, action) => {
      state.date = action.payload;
      state.page = 1;
    },

    clearFilters: (state) => {
      state.search = "";
      state.date = undefined;
      state.page = 1;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchDoctorLeave.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchDoctorLeave.fulfilled, (state, action) => {
        state.isLoading = false;

        state.leaves = action.payload.data.requests;

        state.page = action.payload.data.page;

        state.limit = action.payload.data.limit;

        state.total = action.payload.data.total;

        state.totalPages = action.payload.data.totalPages;
      })

      .addCase(fetchDoctorLeave.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload ?? "Failed to fetch doctor leaves";
      })

      .addCase(createDoctorLeaveThunk.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })

      .addCase(createDoctorLeaveThunk.fulfilled, (state, action) => {
        state.isCreating = false;

        const createdLeave = action.payload.data;

        if (createdLeave) {
          state.leaves.unshift(createdLeave);
        }

        state.total += 1;
      })

      .addCase(createDoctorLeaveThunk.rejected, (state, action) => {
        state.isCreating = false;

        state.createError = action.payload ?? "Failed to create doctor leave";
      })

      //   update Leave
      .addCase(updateDoctorLeaveThunk.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })

      .addCase(updateDoctorLeaveThunk.fulfilled, (state, action) => {
        state.isUpdating = false;

        const updatedLeave = action.payload.data;

        const index = state.leaves.findIndex(
          (leave) => leave.id === updatedLeave.id,
        );

        if (index !== -1) {
          state.leaves[index] = updatedLeave;
        }
      })

      .addCase(updateDoctorLeaveThunk.rejected, (state, action) => {
        state.isUpdating = false;

        state.updateError = action.payload ?? "Failed to update doctor leave";
      })
      .addCase(deleteDoctorLeaveThunk.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })

      .addCase(deleteDoctorLeaveThunk.fulfilled, (state, action) => {
        state.isDeleting = false;

        // Get deleted leave id from the thunk argument
        const deletedId = action.meta.arg;

        state.leaves = state.leaves.filter((leave) => leave.id !== deletedId);

        state.total -= 1;
      })

      .addCase(deleteDoctorLeaveThunk.rejected, (state, action) => {
        state.isDeleting = false;

        state.deleteError = action.payload ?? "Failed to delete doctor leave";
      });
  },
});

export const { setPage, setSearch, setDate, clearFilters } =
  doctorLeaveSlice.actions;

export default doctorLeaveSlice.reducer;
