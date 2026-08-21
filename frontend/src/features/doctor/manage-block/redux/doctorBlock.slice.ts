import { createSlice } from "@reduxjs/toolkit";
import type { DoctorBlock } from "../types/doctorBlock";
import { fetchDoctorBlock } from "./getDoctorBlock.thunk";
import { createDoctorBlockThunk } from "./createDoctorBlock.thunk";
import { updateDoctorBlockThunk } from "./updateDoctorBlock.thunk";
import { deleteDoctorBlockThunk } from "./deleteDoctorBlock.thunk";

interface DoctorBlockState {
  blocks: DoctorBlock[];

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

const initialState: DoctorBlockState = {
  blocks: [],

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

const doctorBlockSlice = createSlice({
  name: "doctorBlock",

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

      .addCase(fetchDoctorBlock.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchDoctorBlock.fulfilled, (state, action) => {
        state.isLoading = false;

        state.blocks = action.payload.data.requests;

        state.page = action.payload.data.page;

        state.limit = action.payload.data.limit;

        state.total = action.payload.data.total;

        state.totalPages = action.payload.data.totalPages;
      })

      .addCase(fetchDoctorBlock.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload ?? "Failed to fetch doctor leaves";
      })

      .addCase(createDoctorBlockThunk.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })

      .addCase(createDoctorBlockThunk.fulfilled, (state, action) => {
        state.isCreating = false;

        const createdLeave = action.payload.data;

        if (createdLeave) {
          state.blocks.unshift(createdLeave);
        }

        state.total += 1;
      })

      .addCase(createDoctorBlockThunk.rejected, (state, action) => {
        state.isCreating = false;

        state.createError = action.payload ?? "Failed to create doctor leave";
      })

      //   update Leave
      .addCase(updateDoctorBlockThunk.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })

      .addCase(updateDoctorBlockThunk.fulfilled, (state, action) => {
        state.isUpdating = false;

        const updatedLeave = action.payload.data;

        const index = state.blocks.findIndex(
          (block) => block.id === updatedLeave.id,
        );

        if (index !== -1) {
          state.blocks[index] = updatedLeave;
        }
      })

      .addCase(updateDoctorBlockThunk.rejected, (state, action) => {
        state.isUpdating = false;

        state.updateError = action.payload ?? "Failed to update doctor leave";
      })
      .addCase(deleteDoctorBlockThunk.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })

      .addCase(deleteDoctorBlockThunk.fulfilled, (state, action) => {
        state.isDeleting = false;

        const deletedId = action.meta.arg;

        state.blocks = state.blocks.filter((block) => block.id !== deletedId);

        state.total -= 1;
      })

      .addCase(deleteDoctorBlockThunk.rejected, (state, action) => {
        state.isDeleting = false;

        state.deleteError = action.payload ?? "Failed to delete doctor leave";
      });
  },
});

export const { setPage, setSearch, setDate, clearFilters } =
  doctorBlockSlice.actions;

export default doctorBlockSlice.reducer;
