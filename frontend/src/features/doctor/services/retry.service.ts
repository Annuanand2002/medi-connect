import axiosInstance from "@/shared/api/axios";
import type { ApiResponse } from "@/entites/api";
import type { RetryDoctorRequest } from "../../../entites/doctor/retryDoctorRequest.type";

export const getRetryDoctorRequest = async (
  token: string,
): Promise<RetryDoctorRequest> => {
  const response = await axiosInstance.get<ApiResponse<RetryDoctorRequest>>(
    `/doctor/retry?token=${token}`,
  );
  return response.data.result!;
};
