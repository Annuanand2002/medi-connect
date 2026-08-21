import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import type { DoctorLeaveListResponse } from "../types/doctorLeave.type";
import { getDoctorLeave } from "../api/doctorLeave.api";

interface GetDoctorLeaveParams {
  page: number;
  limit: number;
  date?: string;
  search?: string;
}

export const fetchDoctorLeave = createAsyncThunk<
  DoctorLeaveListResponse,
  GetDoctorLeaveParams,
  {
    rejectValue: string;
  }
>(
  "doctorLeave/fetchDoctorLeave",
  async ({ page, limit, date, search }, { rejectWithValue }) => {
    try {
      const response = await getDoctorLeave({
        page,
        limit,
        date,
        search,
      });

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to fetch doctor leaves",
      );
    }
  },
);
