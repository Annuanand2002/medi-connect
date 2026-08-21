import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Doctor, DoctorStatus } from "../types/doctorList";
import { getDoctorListThunk } from "./doctorList.thunk";
import { toggleDoctorStatusThunk } from "./toggleDoctorStatus.thunk";

interface DoctorListState {
  loading: boolean;
  requests: Doctor[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  search: string;
  status?: DoctorStatus;
  error: string | null;
}

const initialState: DoctorListState = {
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

const doctorListSlice = createSlice({
  name: "doctorList",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setStatus: (state, action: PayloadAction<DoctorStatus | undefined>) => {
      state.status = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    clearDoctorListState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDoctorListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDoctorListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.data.requests;
        state.page = action.payload.data.page;
        state.limit = action.payload.data.limit;
        state.total = action.payload.data.total;
        state.totalPages = action.payload.data.totalPages;
      })

      .addCase(getDoctorListThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ?? "Failed to fetch doctor requests.";
      })
      .addCase(toggleDoctorStatusThunk.fulfilled,(state,action)=>{
        const updatedDoctor = action.payload;
        console.log(updatedDoctor)
        const index = state.requests.findIndex((doctor)=>doctor.id===updatedDoctor.id)
        if(index!==-1){
            state.requests[index] = updatedDoctor
        }
      })
  },
});

export const { setSearch, setStatus, setPage, clearDoctorListState } =
  doctorListSlice.actions;

export default doctorListSlice.reducer;
