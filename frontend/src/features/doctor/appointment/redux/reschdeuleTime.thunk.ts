import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

import { getDoctorRescheduleTimeSlotsApi } from "../api/appointment";

export const fetchDoctorRescheduleTimeSlots = createAsyncThunk(
  "appointmentDoctorTime/fetchDoctorRescheduleTimeSlots",

  async (date: string, { rejectWithValue }) => {
    try {
      const response = await getDoctorRescheduleTimeSlotsApi(date);

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ||
          "Failed to fetch available time slots",
      );
    }
  },
);