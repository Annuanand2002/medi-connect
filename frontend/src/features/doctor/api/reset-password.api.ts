import type { ApiResponse } from "@/types/api";
import type { SetPasswordPayload } from "../types/auth.type";
import axiosInstance from "@/services/axios";
import { ROUTES } from "@/constants/route";

export const resetPassword = async (data: SetPasswordPayload): Promise<void> => {
  await axiosInstance.patch<ApiResponse>(ROUTES.DOCTOR.PASSWORD.RESET, data);
};
