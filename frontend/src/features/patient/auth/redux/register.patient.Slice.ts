import { createSlice } from "@reduxjs/toolkit";
import { createPatientThunk } from "./register.patient.thunk";

interface PatientRegistrationState {
  isLoading: boolean;
  error: string | null;
  patientId: string | null;
  email: string | null;
}

const initialState: PatientRegistrationState = {
  isLoading: false,
  error: null,
  patientId: null,
  email: null,
};

const patientRegistrationSlice = createSlice({
  name: "patientRegistration",

  initialState,

  reducers: {
    clearRegistrationState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.patientId = null;
      state.email = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPatientThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(createPatientThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patientId = action.payload.data.patientId;
        state.email = action.payload.data.email;
      })

      .addCase(createPatientThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to create patient";
      });
  },
});

export const { clearRegistrationState } = patientRegistrationSlice.actions;

export default patientRegistrationSlice.reducer;
