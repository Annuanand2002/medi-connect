import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/entites/api";
import { logoutAdmin } from "../api/logout";

export const logoutAdminThunk = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await logoutAdmin();
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
