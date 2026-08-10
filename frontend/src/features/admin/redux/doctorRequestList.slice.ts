import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getDoctorRequestListThunk } from "./doctorRequestList.thunk";
import type {
  DoctorRequest,
  DoctorRequestStatus,
} from "../types/doctorRequestList.types";

interface DoctorRequestListState {
  loading: boolean;
  requests: DoctorRequest[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  search: string;
  status?: DoctorRequestStatus;
  error: string | null;
}

const initialState: DoctorRequestListState = {
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

const doctorRequestListSlice = createSlice({
  name: "doctorRequestList",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setStatus: (
      state,
      action: PayloadAction<DoctorRequestStatus | undefined>,
    ) => {
      state.status = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    clearDoctorRequestListState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDoctorRequestListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDoctorRequestListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.result.requests;
        state.page = action.payload.result.page;
        state.limit = action.payload.result.limit;
        state.total = action.payload.result.total;
        state.totalPages = action.payload.result.totalPages;
      })

      .addCase(getDoctorRequestListThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ?? "Failed to fetch doctor requests.";
      });
  },
});

export const { setSearch, setStatus, setPage, clearDoctorRequestListState } =
  doctorRequestListSlice.actions;

export default doctorRequestListSlice.reducer;
