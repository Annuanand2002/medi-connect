import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DoctorListResponse } from "../types/doctorList";
import type { ApiResponse } from "@/types/api";
import { getDoctor } from "../api/doctor.service";
import type { AxiosError } from "axios";


interface GetDoctorParams {
  page: number;
  limit: number;
  status?: string;
  search?: string;
}

export const getDoctorListThunk = createAsyncThunk<
  DoctorListResponse,
  GetDoctorParams,
  { rejectValue: ApiResponse }
>("admin/getDoctortList", async (params, { rejectWithValue }) => {
  try {
    const response = await getDoctor(params);
    return response;
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
