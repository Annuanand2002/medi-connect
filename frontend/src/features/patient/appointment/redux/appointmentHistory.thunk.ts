import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GetPatientAppointmentParams, PatientAppointmentResponse } from "../type/appointmentList";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import { getAppointmentHistory } from "../api/appointment";


export const fetchAppointmentHistory = createAsyncThunk<
  PatientAppointmentResponse,
  GetPatientAppointmentParams,
  { rejectValue: string }
>(
  "appointmentHistory/fetchAppointmentHistory",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAppointmentHistory(params);

      console.log("Appointment History API result:", response);

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ||
          "Failed to fetch appointment history",
      );
    }
  },
);
