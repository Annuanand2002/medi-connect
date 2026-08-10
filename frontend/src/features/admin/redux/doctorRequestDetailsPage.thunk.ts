import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import { getDoctorRequestById } from "../api/doctorRequest.service";
import type { DoctorRequestDetails } from "../types/doctorRequestDetials.types";

export const getDoctorRequestDetailsThunk = createAsyncThunk<
  DoctorRequestDetails,
  string,
  { rejectValue: ApiResponse }
>("admin/getDoctorRequestDetails", async (id, { rejectWithValue }) => {
  try {
    const result = await getDoctorRequestById(id);
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
