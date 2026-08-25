import axiosInstance from "@/services/axios";
import type { RequestResetPasswordResponse } from "../types/requestResetPassword";

export const resetDoctorPasswordRequest = async (
  email: string,
): Promise<RequestResetPasswordResponse> => {
  const response = await axiosInstance.patch<RequestResetPasswordResponse>(
    "/doctor/request-resetpassword",
    {
      email,
    },
  );
  return response.data;
  
};
