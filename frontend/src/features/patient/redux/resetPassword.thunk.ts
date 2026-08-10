import type { ApiResponse } from "@/types/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { resetPatientPassword } from "../api/resetPassword.patient";
import type { SetPasswordPayload } from "@/features/doctor/types/auth.type";

export const resetPatientPasswordThunk = createAsyncThunk<
  void,
  SetPasswordPayload,
  { rejectValue: ApiResponse }
>("patient/reset-password", async (data, { rejectWithValue }) => {
  try {
    await resetPatientPassword(data);
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
