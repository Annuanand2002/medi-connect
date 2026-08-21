import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import type { DoctorBlockListResponse } from "../types/doctorBlock";
import { getDoctorBlock } from "../api/doctorBlock.api";

interface GetDoctorBlockParams {
  page: number;
  limit: number;
  date?: string;
  search?: string;
}

export const fetchDoctorBlock = createAsyncThunk<
  DoctorBlockListResponse,
  GetDoctorBlockParams,
  {
    rejectValue: string;
  }
>(
  "doctorBlock/fetchDoctorBlock",
  async ({ page, limit, date, search }, { rejectWithValue }) => {
    try {
      const response = await getDoctorBlock({
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
