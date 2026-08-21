import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { ApiResponse } from "@/types/api";
import type {
  CreateDoctorBlock,
  CreateDoctorBlockResponse,
} from "../types/doctorBlock";
import { createDoctorBlock } from "../api/doctorBlock.api";

export const createDoctorBlockThunk = createAsyncThunk<
  CreateDoctorBlockResponse,
  CreateDoctorBlock,
  {
    rejectValue: string;
  }
>(
  "doctorBlock/createDoctorBlock",

  async (data, { rejectWithValue }) => {
    try {
      const response = await createDoctorBlock(data);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ?? "Failed to create doctor block",
      );
    }
  },
);
