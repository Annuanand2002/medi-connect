import type { RequestResetPasswordResponse } from "@/features/doctor/types/requestResetPassword";
import axiosInstance from "@/services/axios";

export const resetPatientPasswordRequest = async (
  email: string,
): Promise<RequestResetPasswordResponse> => {
  const response = await axiosInstance.patch<RequestResetPasswordResponse>(
    "/patient/requeset-reset",
    {
      email,
    },
  );
  return response.data;
};
