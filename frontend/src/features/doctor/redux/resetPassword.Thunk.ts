import type { ApiResponse } from "@/types/api";
import type { SetPasswordPayload } from "../types/auth.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPassword } from "../api/reset-password.api";
import type { AxiosError } from "axios";

export const resetPasswordThunk = createAsyncThunk<
  void,
  SetPasswordPayload,
  { rejectValue: ApiResponse }
>("doctor/reset-password", async (data, { rejectWithValue }) => {
  try {
    await resetPassword(data);
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;

    return rejectWithValue(
      axiosError.response?.data ?? {
        success: false,
        message: "Something went wrong.",
      },
    );
  }
});
