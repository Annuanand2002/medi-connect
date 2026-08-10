import { createSlice } from "@reduxjs/toolkit";
import type { Department } from "../types/department.types";
import { getDepartmentsThunk, createDepartmentThunk } from "./department.thunk";

interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder

      .addCase(getDepartmentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDepartmentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })

      .addCase(getDepartmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Failed to fetch departments.";
      })

      .addCase(createDepartmentThunk.fulfilled, (state, action) => {
        state.departments.push(action.payload);
      });
  },
});

export default departmentSlice.reducer;
