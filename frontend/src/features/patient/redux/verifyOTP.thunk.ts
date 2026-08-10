import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  VerifyPatientOtpRequest,
  VerifyPatientOtpResponse,
} from "../types/patientOtp";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import { verifyPateintOTP } from "../api/registerOTP.api";

export const verifyPatientOTPThunk = createAsyncThunk<
  VerifyPatientOtpResponse,
  VerifyPatientOtpRequest,
  {
    rejectValue: string;
  }
>("patient/verify-otp", async (data, { rejectWithValue }) => {
  try {
    const reponse = await verifyPateintOTP(data);
    return reponse;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    return rejectWithValue(
      axiosError.response?.data?.message ?? "falied to verify OTP",
    );
  }
});
