import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { ApiResponse } from "@/types/api";
import type {
  CreateDoctorLeave,
  CreateDoctorLeaveResponse,
} from "../types/doctorLeave.type";
import { updateDoctorLeave } from "../api/doctorLeave.api";


interface UpdateDoctorLeavePayload {
  id: string;
  data: CreateDoctorLeave;
}

export const updateDoctorLeaveThunk = createAsyncThunk<
  CreateDoctorLeaveResponse,
  UpdateDoctorLeavePayload,
  {
    rejectValue: string;
  }
>(
  "doctorLeave/updateDoctorLeave",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateDoctorLeave(id, data);

      if (!response.success || !response.data) {
        return rejectWithValue(
          response.message || "Failed to update doctor leave",
        );
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Failed to update doctor leave",
      );
    }
  },
);