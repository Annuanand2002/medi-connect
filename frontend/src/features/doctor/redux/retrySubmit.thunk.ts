import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/entites/api";
import { retryDoctorRequest } from "../services/retrySubmit";

export const retryDoctorRequestThunk = createAsyncThunk(
  "doctor/retryDoctorRequest",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      return await retryDoctorRequest(formData);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data ?? {
          success: false,
          message: "Something went wrong",
        },
      );
    }
  },
);
