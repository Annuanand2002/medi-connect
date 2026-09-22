import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

import { getDoctorRescheduleAvailableDates } from "../api/appointment";
import type { DoctorRequestDate } from "../types/appointmentDate";

interface DoctorRescheduleDateParams {
  appointmentId: string;
  startDate: string;
  endDate: string;
}

export const fetchDoctorRescheduleAvailableDates = createAsyncThunk(
  "appointmentDate/fetchDoctorRescheduleAvailableDates",

  async (
    params: DoctorRescheduleDateParams,
    { rejectWithValue },
  ) => {
    try {
      const dateParams: DoctorRequestDate = {
        startDate: params.startDate,
        endDate: params.endDate,
      };

      const response = await getDoctorRescheduleAvailableDates(
        params.appointmentId,
        dateParams,
      );

      return {
        dates: response.data,
        startDate: params.startDate,
        endDate: params.endDate,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ||
          "Failed to fetch doctor reschedule available dates",
      );
    }
  },
);