import axiosInstance from "@/services/axios";
import type { ApiResponse } from "@/types/api";

export const logoutAdmin = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post("/admin/logout");
  return data;
};
