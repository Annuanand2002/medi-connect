import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getDoctorRequests } from "../services/doctorRequest.service";
import type { ApiResponse } from "@/entites/api";
import type { DoctorRequestListResponse } from "../../../entites/doctor/doctorRequestList.types";

interface GetDoctorRequestParams {
  page: number;
  limit: number;
  status?: string;
  search?: string;
}

export const getDoctorRequestListThunk = createAsyncThunk<
  DoctorRequestListResponse,
  GetDoctorRequestParams,
  { rejectValue: ApiResponse }
>("admin/getDoctorRequestList", async (params, { rejectWithValue }) => {
  try {
    const response = await getDoctorRequests(params);
    console.log("response", response);
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
