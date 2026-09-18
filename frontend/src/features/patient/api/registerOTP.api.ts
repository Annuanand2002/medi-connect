import axiosInstance from "@/services/axios";
import type {
  VerifyPatientOtpRequest,
  VerifyPatientOtpResponse,
} from "../types/patientOtp";
import { ROUTES } from "@/constants/route";

export const verifyPateintOTP = async (
  data: VerifyPatientOtpRequest,
): Promise<VerifyPatientOtpResponse> => {
  const response = await axiosInstance.patch<VerifyPatientOtpResponse>(
    `${ROUTES.PATIENT.REGISTER.VERIFY}/${data.patientId}`,
    {
      otp: data.otp,
    },
  );
  return response.data;
};
