import { createSlice } from "@reduxjs/toolkit";
import { applyDoctorRequestThunk } from "./doctorRequest.thunk";
import type { ApiResponse } from "@/entites/api";

interface DoctorRequestState {
  loading: boolean;
  success: boolean;
  message: string;
}

const initialState: DoctorRequestState = {
  loading: false,
  success: false,
  message: "",
};

const doctorRequestSlice = createSlice({
  name: "doctorRequest",
  initialState,
  reducers: {
    clearDoctorRequestState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyDoctorRequestThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = "";
      })

      .addCase(applyDoctorRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(applyDoctorRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.message =
          (action.payload as ApiResponse | undefined)?.message ??
          "Something went wrong.";
      });
  },
});

export const { clearDoctorRequestState } = doctorRequestSlice.actions;

export default doctorRequestSlice.reducer;
