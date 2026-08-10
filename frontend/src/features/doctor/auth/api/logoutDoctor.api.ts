import axiosInstance from "@/services/axios";
import type { ApiResponse } from "@/types/api";

export const logoutDoctor = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post("/doctor/logout");
  return data;
};
