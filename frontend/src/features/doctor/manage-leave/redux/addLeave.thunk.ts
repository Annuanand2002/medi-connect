import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { ApiResponse } from "@/types/api";

import type {
    CreateDoctorLeave,
    CreateDoctorLeaveResponse,

} from "../types/doctorLeave.type";
import { createDoctorLeave } from "../api/doctorLeave.api";

export const createDoctorLeaveThunk = createAsyncThunk<
  CreateDoctorLeaveResponse,
  CreateDoctorLeave,
  {
    rejectValue: string;
  }
>(
  "doctorLeave/createDoctorLeave",

  async (data, { rejectWithValue }) => {
    try {
      const response = await createDoctorLeave(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to create doctor leave",
      );
    }
  },
);
