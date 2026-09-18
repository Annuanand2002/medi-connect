import axiosInstance from "@/services/axios";
import type { RequestResetPasswordResponse } from "../types/requestResetPassword";
import { ROUTES } from "@/constants/route";

export const resetDoctorPasswordRequest = async (
  email: string,
): Promise<RequestResetPasswordResponse> => {
  const response = await axiosInstance.patch<RequestResetPasswordResponse>(
    ROUTES.DOCTOR.PASSWORD.REQUEST,
    {
      email,
    },
  );
  return response.data;
  
};
