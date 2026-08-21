import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import { getDoctorRequestById } from "../api/doctor.service";
import type { DoctorRequestDetails } from "../types/doctorRequestDetials.types";

export const getDoctorRequestDetailsThunk = createAsyncThunk<
  DoctorRequestDetails,
  string,
  { rejectValue: ApiResponse }
>("admin/getDoctorRequestDetails", async (id, { rejectWithValue }) => {
  try {
    const data = await getDoctorRequestById(id);
    console.log(data);
    return data;
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
