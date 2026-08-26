import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AvailableTimeSlot } from "../type/appointmentTime";
import { getTimeSlotsApi } from "../api/appointment";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export const fetchTimeSlots = createAsyncThunk<
  {
    slots: AvailableTimeSlot[];
    date: string;
  },
  {
    doctorId: string;
    date: string;
  },
  { rejectValue: string }
>(
  "appointment/fetchTimeSlots",
  async ({ doctorId, date }, { rejectWithValue }) => {
    try {
      const slots = await getTimeSlotsApi(doctorId, date);

      return {
        slots,
        date,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      return rejectWithValue(
        axiosError?.response?.data?.message || "Failed to fetch time slots",
      );
    }
  },
);
