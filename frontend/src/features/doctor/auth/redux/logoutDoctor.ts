import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import { logoutDoctor } from "../api/doctorauthentication.api";

export const logoutDoctorThunk = createAsyncThunk(
  "doctor/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await logoutDoctor();
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
