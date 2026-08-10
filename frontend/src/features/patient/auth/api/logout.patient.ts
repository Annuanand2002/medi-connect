import axiosInstance from "@/services/axios";
import type { ApiResponse } from "@/types/api";

export const logoutPatient = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post("/patient/logout");
  return data;
};
