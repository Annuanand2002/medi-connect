import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { RejectDoctorPayload } from "../types/rejectDoctor.types";
import type { ApiResponse } from "@/types/api";
import { rejectDoctor } from "../api/rejectDoctor";

export const rejectDoctorThunk = createAsyncThunk<
  void,
  RejectDoctorPayload,
  { rejectValue: ApiResponse }
>("admin/rejectDoctor", async (data, { rejectWithValue }) => {
  try {
    const result = await rejectDoctor(data);
    console.log(result);
    return result;
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
