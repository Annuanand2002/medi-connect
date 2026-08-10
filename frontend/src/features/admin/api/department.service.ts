import axiosInstance from "@/services/axios";
import type {
  Department,
  CreateDepartmentPaylaod,
} from "../types/department.types";
import type { ApiResponse } from "@/types/api";

export const getDepartments = async (): Promise<Department[]> => {
  const response =
    await axiosInstance.get<ApiResponse<Department[]>>("/admin/department");
  console.log(response);
  console.log("response", response.data.result!);
  return response.data.result!;
};

export const createDepartment = async (
  data: CreateDepartmentPaylaod,
): Promise<Department> => {
  const response = await axiosInstance.post<ApiResponse<Department>>(
    "/admin/department",
    data,
  );

  return response.data.result!;
};
