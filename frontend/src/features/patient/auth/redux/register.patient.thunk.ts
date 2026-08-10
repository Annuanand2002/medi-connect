import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  PatientRegistrationRequest,
  PatientRegistrationResponse,
} from "../../types/registerForm.Patient";
import { createPatient } from "../../api/regiseterForm.api";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export const createPatientThunk = createAsyncThunk<
  PatientRegistrationResponse,
  PatientRegistrationRequest,
  {
    rejectValue: string;
  }
>(
  "patientRegistration/createPatient",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createPatient(data);

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Failed to create patient"
      );
    }
  }
);