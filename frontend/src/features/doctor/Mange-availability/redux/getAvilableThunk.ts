import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DoctorAvailability } from "../types/doctorAvail.type";
import { getDoctorAvailability } from "../api/DoctorAvil";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

export const fetchDoctorAvailability = createAsyncThunk<
  DoctorAvailability[],
  void,
  { rejectValue: string }
>("availability/fetchDoctorAvailability", async (_, { rejectWithValue }) => {
  try {
    const response = await getDoctorAvailability();

    if (!response.success || !response.data) {
      return rejectWithValue(response.message);
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;

    return rejectWithValue(
      axiosError.response?.data?.message ?? "Something went wrong.",
    );
  }
});
