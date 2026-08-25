import { createSlice } from "@reduxjs/toolkit";
import type { DoctorAvailability } from "../types/doctorAvail.type";

import { fetchDoctorAvailability } from "./getAvilableThunk";
import { createAvailability } from "./createThunk";
import { updateAvailability } from "./updateThunk";
import { deleteAvailability } from "./delteThunk";

interface AvailabilityState {
  availability: DoctorAvailability[];

  isLoading: boolean;
  error: string | null;

  isCreating: boolean;
  createError: string | null;

  isUpdating: boolean;
  updateError: string | null;

  isDeleting: boolean;
  deleteError: string | null;
}

const initialState: AvailabilityState = {
  availability: [],

  isLoading: false,
  error: null,

  isCreating: false,
  createError: null,

  isUpdating: false,
  updateError: null,

  isDeleting: false,
  deleteError: null,
};

const availabilitySlice = createSlice({
  name: "availability",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // GET
      // =========================

      .addCase(
        fetchDoctorAvailability.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )

      .addCase(
        fetchDoctorAvailability.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.availability = action.payload;
        },
      )

      .addCase(
        fetchDoctorAvailability.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload ??
            "Failed to fetch availability";
        },
      )

      // =========================
      // CREATE
      // =========================

      .addCase(
        createAvailability.pending,
        (state) => {
          state.isCreating = true;
          state.createError = null;
        },
      )

      .addCase(
        createAvailability.fulfilled,
        (state, action) => {
          state.isCreating = false;

          // Create returns multiple records
          state.availability.push(
            ...action.payload.data,
          );
        },
      )

      .addCase(
        createAvailability.rejected,
        (state, action) => {
          state.isCreating = false;
          state.createError =
            action.payload ??
            "Failed to create availability";
        },
      )

      // =========================
      // UPDATE
      // =========================

      .addCase(
        updateAvailability.pending,
        (state) => {
          state.isUpdating = true;
          state.updateError = null;
        },
      )

      .addCase(
        updateAvailability.fulfilled,
        (state, action) => {
          state.isUpdating = false;

          const updatedAvailability =
            action.payload.data;

          const index =
            state.availability.findIndex(
              (item) =>
                item.id ===
                updatedAvailability.id,
            );

          if (index !== -1) {
            state.availability[index] =
              updatedAvailability;
          }
        },
      )

      .addCase(
        updateAvailability.rejected,
        (state, action) => {
          state.isUpdating = false;
          state.updateError =
            action.payload ??
            "Failed to update availability";
        },
      )

      // =========================
      // DELETE
      // =========================

      .addCase(
        deleteAvailability.pending,
        (state) => {
          state.isDeleting = true;
          state.deleteError = null;
        },
      )

      .addCase(
        deleteAvailability.fulfilled,
        (state, action) => {
          state.isDeleting = false;

          state.availability =
            state.availability.filter(
              (item) =>
                item.id !== action.payload,
            );
        },
      )

      .addCase(
        deleteAvailability.rejected,
        (state, action) => {
          state.isDeleting = false;
          state.deleteError =
            action.payload ??
            "Failed to delete availability";
        },
      );
  },
});

export default availabilitySlice.reducer;