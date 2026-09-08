import type { AxiosError } from "axios";
import { singleAppointmentPage } from "../api/appointment";
import type { ApiResponse } from "@/types/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleAppointment = createAsyncThunk(
  "appointment/fetchSingleAppointment",
  async (id: string, { rejectWithValue }) => {
    try {
      return await singleAppointmentPage(id);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Failed to fetch appointment",
      );
    }
  },
);
