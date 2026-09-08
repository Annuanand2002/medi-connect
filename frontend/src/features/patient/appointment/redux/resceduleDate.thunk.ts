import type { ApiResponse } from "@/types/api";
import type { AxiosError } from "axios";
import { getRescheduleAvailableDates } from "../api/appointment";
import type { PatientRequestDate } from "../type/appointmentDate";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRescheduleAvailableDates = createAsyncThunk(
  "appointmentDate/fetchRescheduleAvailableDates",

  async (
    {
      appointmentId,
      params,
    }: {
      appointmentId: string;
      params: PatientRequestDate;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await getRescheduleAvailableDates(appointmentId, params);

      return {
        dates: response.data,
        startDate: params.startDate,
        endDate: params.endDate,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ||
          "Failed to fetch reschedule available dates",
      );
    }
  },
);
