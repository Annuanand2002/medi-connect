import axiosInstance from "@/shared/api/axios";
import type { ApiResponse } from "@/entites/api";
import type { SetPasswordPayload } from "../../../entites/doctor/auth.type";

export const setPassword = async (data: SetPasswordPayload): Promise<void> => {
  await axiosInstance.post<ApiResponse>("/doctor/setup-password", data);
};
