import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import type { ApiResponse } from "@/entites/api";
import {
  getDepartments,
  createDepartment,
} from "../services/department.service";

import type {
  Department,
  CreateDepartmentPaylaod,
} from "../../../entites/doctor/department.types";

export const getDepartmentsThunk = createAsyncThunk<
  Department[],
  void,
  { rejectValue: ApiResponse }
>("admin/getDepartments", async (_, { rejectWithValue }) => {
  try {
    const result = await getDepartments();
    console.log("department", result);
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

export const createDepartmentThunk = createAsyncThunk<
  Department,
  CreateDepartmentPaylaod,
  { rejectValue: ApiResponse }
>("admin/createDepartment", async (data, { rejectWithValue }) => {
  try {
    return await createDepartment(data);
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
