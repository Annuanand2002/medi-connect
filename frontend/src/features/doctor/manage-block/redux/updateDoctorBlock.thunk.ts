import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { ApiResponse } from "@/types/api";
import type { CreateDoctorBlock, CreateDoctorBlockResponse } from "../types/doctorBlock";
import { updateDoctorBlock } from "../api/doctorBlock.api";

interface UpdateDoctorBlockPayload {
  id: string;
  data: CreateDoctorBlock;
}

export const updateDoctorBlockThunk = createAsyncThunk<
  CreateDoctorBlockResponse,
  UpdateDoctorBlockPayload,
  {
    rejectValue: string;
  }
>(
  "doctorBlock/updateDoctorBlock",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateDoctorBlock(id, data);

      if (!response.success || !response.data) {
        return rejectWithValue(
          response.message || "Failed to update doctor block",
        );
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Failed to update doctor block",
      );
    }
  },
);