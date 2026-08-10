import axiosInstance from "@/services/axios";
import type { ApiResponse } from "@/types/api";
import type { SetPasswordPayload } from "../types/auth.type";

export const setPassword = async (data: SetPasswordPayload): Promise<void> => {
  await axiosInstance.post<ApiResponse>("/doctor/setup-password", data);
};
