import type { ApiResponse } from "@/types/api";
import type { SetPasswordPayload } from "../types/auth.type";
import axiosInstance from "@/services/axios";

export const resetPassword = async (data: SetPasswordPayload): Promise<void> => {
  await axiosInstance.patch<ApiResponse>("/doctor/reset-password", data);
};
