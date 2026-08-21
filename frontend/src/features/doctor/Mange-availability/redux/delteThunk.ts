import type { ApiResponse } from "@/types/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { delteDoctorAvailability } from "../api/DoctorAvil";

export const deleteAvailability = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string;
  }
>(
  "availability/deleteAvailability",
  async (id, { rejectWithValue }) => {
    try {
      const response = await delteDoctorAvailability(id)

      if (!response.success) {
        return rejectWithValue(
          response.message,
        );
      }

      return id;
    } catch (error) {
      const axiosError =
        error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Failed to delete availability",
      );
    }
  },
);