import axiosInstance from "@/services/axios";
import type {
  VerifyPatientOtpRequest,
  VerifyPatientOtpResponse,
} from "../types/patientOtp";

export const verifyPateintOTP = async (
  data: VerifyPatientOtpRequest,
): Promise<VerifyPatientOtpResponse> => {
  const response = await axiosInstance.patch<VerifyPatientOtpResponse>(
    `/patient/verify-otp/${data.patientId}`,
    {
      otp: data.otp,
    },
  );
  return response.data;
};
