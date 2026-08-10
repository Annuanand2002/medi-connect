import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApproveDoctorPayload } from "../types/approveDoctor.types";
import type { ApiResponse } from "@/types/api";
import type { AxiosError } from "axios";
import { approveDoctorRequest } from "../api/approveDoctor.services";

export const approveDoctorThunk = createAsyncThunk<
  void,
  ApproveDoctorPayload,
  { rejectValue: ApiResponse }
>("admin/approveDoctor", async (data, { rejectWithValue }) => {
  try {
    return await approveDoctorRequest(data);
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    return rejectWithValue(
      axiosError.response?.data ?? {
        success: false,
        message: "Something went wrong",
      },
    );
  }
});
