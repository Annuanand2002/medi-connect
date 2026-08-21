import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PatientListResponse } from "../types/patientList";
import type { ApiResponse } from "@/types/api";
import { getPatient } from "../api/patient.service";
import type { AxiosError } from "axios";

interface GetPatientParams {
  page: number;
  limit: number;
  status?: string;
  search?: string;
}

export const getPatientListThunk = createAsyncThunk<
  PatientListResponse,
  GetPatientParams,
  { rejectValue: ApiResponse }
>("admin/getPatientList", async (params, { rejectWithValue }) => {
  try {
    const response = await getPatient(params);
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
