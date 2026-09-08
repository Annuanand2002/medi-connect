import axiosInstance from "@/services/axios";
import type { DoctorRetryRequestResponse} from "../types/retryDoctorRequest.type";

export const getRetryDoctorRequest = async (
  token: string,
): Promise<DoctorRetryRequestResponse["data"]> => {
  const response = await axiosInstance.get<DoctorRetryRequestResponse>(
    `/doctor/retry?token=${token}`,
  );

  console.log(response.data, "response.data");

  return response.data.data;
};
