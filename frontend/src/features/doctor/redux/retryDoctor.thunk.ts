import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getRetryDoctorRequest } from "../api/retry.service";
import type { ApiResponse } from "@/types/api";
import type { RetryDoctorRequest } from "../types/retryDoctorRequest.type";

export const getRetryDoctorRequestThunk = createAsyncThunk<
  RetryDoctorRequest,
  string,
  { rejectValue: ApiResponse }
>("doctor/getRetryRequest", async (token, { rejectWithValue }) => {
  try {
    return await getRetryDoctorRequest(token);
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
