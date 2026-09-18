import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAppointmentDetails } from "../api/appointment";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export const fetchAppointmentDetails = createAsyncThunk(
  "appointment/fetchAppointmentDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getAppointmentDetails(id)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Failed to fetch appointment",
      );
    }
  },
);
