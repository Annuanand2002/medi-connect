import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { ApiResponse } from "@/types/api";

import type {
  UpdateDoctorAvailability,
  UpdateDoctorAvailResponse,
} from "../types/addDoctorAvail.type";

import { updateDoctorAvailability } from "../api/DoctorAvil";

interface UpdateAvailabilityPayload {
  id: string;
  data: UpdateDoctorAvailability;
}

export const updateAvailability =
  createAsyncThunk<
    UpdateDoctorAvailResponse,
    UpdateAvailabilityPayload,
    {
      rejectValue: string;
    }
  >(
    "availability/updateAvailability",

    async (
      { id, data },
      { rejectWithValue },
    ) => {
      try {
        const response =
          await updateDoctorAvailability(
            id,
            data,
          );

        if (
          !response.success ||
          !response.data
        ) {
          return rejectWithValue(
            response.message,
          );
        }

        return response;
      } catch (error) {
        const axiosError =
          error as AxiosError<ApiResponse>;

        return rejectWithValue(
          axiosError.response?.data
            ?.message ??
            "Failed to update availability",
        );
      }
    },
  );