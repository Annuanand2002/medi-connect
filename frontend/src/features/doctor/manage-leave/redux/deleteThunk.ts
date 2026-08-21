import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoctorLeave } from "../api/doctorLeave.api";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import type { CreateDoctorLeaveResponse } from "../types/doctorLeave.type";

export const deleteDoctorLeaveThunk = createAsyncThunk<
  CreateDoctorLeaveResponse,
  string,
  { rejectValue: string }
>("doctorLeave/deleteDoctorLeave", async (id, { rejectWithValue }) => {
  try {
    return await deleteDoctorLeave(id);
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    return rejectWithValue(
      axiosError.response?.data?.message ?? "Failed to delete doctor leave",
    );
  }
});
