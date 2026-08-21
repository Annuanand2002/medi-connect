import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Doctor } from "../types/doctorList";
import type { ApiResponse } from "@/types/api";
import type { AxiosError } from "axios";
import { toggleDoctorStatus } from "../api/doctor.service";

export const toggleDoctorStatusThunk = createAsyncThunk<
  Doctor,
  string,
  { rejectValue: ApiResponse }
>(
  "doctor/toggleDoctorStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await toggleDoctorStatus(id);
      return response;
    } catch (error) {
      const axiosError =
        error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data ?? {
          success: false,
          message: "Something went wrong.",
        },
      );
    }
  },
);