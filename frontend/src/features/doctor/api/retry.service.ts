import axiosInstance from "@/services/axios";
import type { ApiResponse } from "@/types/api";
import type { RetryDoctorRequest } from "../types/retryDoctorRequest.type";

export const getRetryDoctorRequest = async (
  token: string,
): Promise<RetryDoctorRequest> => {
  const response = await axiosInstance.get<ApiResponse<RetryDoctorRequest>>(
    `/doctor/retry?token=${token}`,
  );
  return response.data.result!;
};
