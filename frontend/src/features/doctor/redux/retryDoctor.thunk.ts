import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getRetryDoctorRequest } from "../services/retry.service";
import type { ApiResponse } from "@/entites/api";
import type { RetryDoctorRequest } from "../../../entites/doctor/retryDoctorRequest.type";

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
