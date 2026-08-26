import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import type { PatientRequestDate } from "../type/appointmentDate";
import { getAvailableDates } from "../api/appointment";

export const fetchAvailableDates = createAsyncThunk(
  "appointmentDate/fetchAvailableDates",

  async (params: PatientRequestDate, { rejectWithValue }) => {
    try {
      const response = await getAvailableDates(params);

      return {
        dates: response.data,
        startDate: params.startDate,
        endDate: params.endDate,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Failed to fetch available dates",
      );
    }
  },
);
