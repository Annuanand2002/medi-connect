import type { ApiResponse } from "@/types/api";
import { getRescheduleTimeSlotsApi } from "../api/appointment";
import type { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AvailableTimeSlot } from "../type/appointmentTime";

export const fetchRescheduleTimeSlots = createAsyncThunk<
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
  "appointment/fetchRescheduleTimeSlots",
  async ({ doctorId, date }, { rejectWithValue }) => {
    try {
      const slots = await getRescheduleTimeSlotsApi(doctorId, date);

      return {
        slots,
        date,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError?.response?.data?.message ||
          "Failed to fetch reschedule time slots",
      );
    }
  },
);
