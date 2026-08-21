import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { ApiResponse } from "@/types/api";
import type { CreateDoctorAvailability, CreateDoctorAvailResponse } from "../types/addDoctorAvail.type";
import { createDoctorAvailability } from "../api/DoctorAvil";

export const createAvailability = createAsyncThunk<
  CreateDoctorAvailResponse,
  CreateDoctorAvailability,
  { rejectValue: string }
>(
  "availability/createAvailability",
  async (data, { rejectWithValue }) => {
  try {
      const response = await createDoctorAvailability(data);

      if (!response.success || !response.data) {
        return rejectWithValue(response.message);
      }

      return response;
    }  catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Something went wrong.",
      );
    }
  },
);
