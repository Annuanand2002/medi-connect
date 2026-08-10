import type { ApiResponse } from "@/types/api";
import axiosInstance from "@/services/axios";
import type { SetPasswordPayload } from "@/features/doctor/types/auth.type";

export const resetPatientPassword = async (
  data: SetPasswordPayload,
): Promise<void> => {
  await axiosInstance.patch<ApiResponse>("/patient/reset-password", data);
};
