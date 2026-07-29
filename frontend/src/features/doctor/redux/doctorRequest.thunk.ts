import { createAsyncThunk } from "@reduxjs/toolkit";
import { applyDoctorRequest } from "../services/doctorRequest.service";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/entites/api";

export const applyDoctorRequestThunk = createAsyncThunk(
  "doctor/applyDoctorRequest",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      return await applyDoctorRequest(formData);
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
