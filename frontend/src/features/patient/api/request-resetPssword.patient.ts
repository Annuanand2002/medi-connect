import { ROUTES } from "@/constants/route";
import type { RequestResetPasswordResponse } from "@/features/doctor/types/requestResetPassword";
import axiosInstance from "@/services/axios";

export const resetPatientPasswordRequest = async (
  email: string,
): Promise<RequestResetPasswordResponse> => {
  const response = await axiosInstance.patch<RequestResetPasswordResponse>(
    ROUTES.PATIENT.PASSWORD.REQUEST,
    {
      email,
    },
  );
  return response.data;
};
