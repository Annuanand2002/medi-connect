import type { ApiResponse } from "@/types/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { togglePatientStatus } from "../api/patient.service";
import type { AxiosError } from "axios";
import type { Patients } from "../types/patientList";


export const togglePatientStatusThunk = createAsyncThunk<
  Patients,
  string,
  { rejectValue: ApiResponse }
>(
  "patient/togglePatientStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await togglePatientStatus(id);
      return response;
    } catch (error) {
      const axiosError =
        error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data ?? {
          success: false,
          message: "Something went wrong.",
        },
      );
    }
  },
);