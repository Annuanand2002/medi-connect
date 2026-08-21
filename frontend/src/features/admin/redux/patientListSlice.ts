import type { Patients, PatientStatus } from "../types/patientList";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getPatientListThunk } from "./patient.thunk";
import { togglePatientStatusThunk } from "./togglePatient.thunk";

interface PatientListState {
  loading: boolean;
  requests: Patients[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  search: string;
  status?: PatientStatus;
  error: string | null;
}

const initialState: PatientListState = {
  loading: false,
  requests: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  search: "",
  status: undefined,
  error: null,
};

const patientListSlice = createSlice({
  name: "patientList",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setStatus: (state, action: PayloadAction<PatientStatus | undefined>) => {
      state.status = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    clearPatientListState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPatientListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getPatientListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.data.requests;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
        state.total = action.payload.data.total;
        state.totalPages = action.payload.data.totalPages;
      })

      .addCase(getPatientListThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message ?? "Failed to fetch patinets.";
      })
      .addCase(togglePatientStatusThunk.fulfilled, (state, action) => {
        const updatedPatient = action.payload;
        const index = state.requests.findIndex(
          (patient) => patient.id === updatedPatient.id,
        );
        if (index !== -1) {
          state.requests[index] = updatedPatient;
        }
      });
  },
});

export const { setSearch, setStatus, setPage, clearPatientListState } =
  patientListSlice.actions;

export default patientListSlice.reducer;
