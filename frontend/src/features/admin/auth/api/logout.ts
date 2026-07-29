import axiosInstance from "@/shared/api/axios";
import type { ApiResponse } from "@/entites/api";

export const logoutAdmin = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post("/admin/logout");
  return data;
};
