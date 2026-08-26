import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Doctor, GetDoctorsParams } from "../type/getDoctorList";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import { getPatientDoctors } from "../api/appointment";


export const fetchListDoctors = createAsyncThunk<
  {
    doctors: Doctor[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  },
  GetDoctorsParams,
  { rejectValue: string }
>("patient/fetchDoctors", async (params, { rejectWithValue }) => {
  try {
    const response = await getPatientDoctors(params);

    return {
      doctors: response.data.requests,
      page: response.data.page,
      limit: response.data.limit,
      total: response.data.total,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    return rejectWithValue(
      axiosError?.response?.data?.message || "Failed to fetch doctors",
    );
  }
});
