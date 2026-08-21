import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import type { CreateDoctorBlockResponse } from "../types/doctorBlock";
import { deleteDoctorBlock } from "../api/doctorBlock.api";

export const deleteDoctorBlockThunk = createAsyncThunk<
  CreateDoctorBlockResponse,
  string,
  { rejectValue: string }
>("doctorBlock/deleteDoctorBlock", async (id, { rejectWithValue }) => {
  try {
    return await deleteDoctorBlock(id);
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    return rejectWithValue(
      axiosError.response?.data?.message ?? "Failed to delete doctor block",
    );
  }
});
