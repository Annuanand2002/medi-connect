import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
  DoctorAppointmentResponse,
  GetDoctorAppointmentParams,
} from "../types/appointmentHistory";
import type { AxiosError } from "axios";
import { getDoctorAppointment } from "../api/appointment";

interface ApiErrorResponse {
  success: boolean;
  message: string;
}

export const fetchDoctorAppointment = createAsyncThunk<
  DoctorAppointmentResponse,
  GetDoctorAppointmentParams,
  { rejectValue: string }
>(
  "doctorAppointment/fetchDoctorAppointment",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getDoctorAppointment(params);

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ||
          "Failed to fetch doctor appointments",
      );
    }
  },
);
