import axiosInstance from "@/shared/api/axios";
import type {
  Department,
  CreateDepartmentPaylaod,
} from "../../../entites/doctor/department.types";
import type { ApiResponse } from "@/entites/api";

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
