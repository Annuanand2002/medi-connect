import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { setPassword } from "../api/auth.service";
import type { ApiResponse } from "@/types/api";
import type { SetPasswordPayload } from "../types/auth.type";

export const setPasswordThunk = createAsyncThunk<
  void,
  SetPasswordPayload,
  { rejectValue: ApiResponse }
>("doctor/setPassword", async (data, { rejectWithValue }) => {
  try {
    await setPassword(data);
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
