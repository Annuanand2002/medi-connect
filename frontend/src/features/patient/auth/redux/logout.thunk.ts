import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import type { ApiResponse } from "@/types/api";
import { logoutPatient } from "../api/patientauthentication.api";

export const logoutPatientThunk = createAsyncThunk(
  "patient/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await logoutPatient();
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
