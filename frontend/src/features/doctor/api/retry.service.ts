import axiosInstance from "@/services/axios";
import type { DoctorRetryRequestResponse} from "../types/retryDoctorRequest.type";
import { ROUTES } from "@/constants/route";

export const getRetryDoctorRequest = async (
  token: string,
): Promise<DoctorRetryRequestResponse["data"]> => {
  const response = await axiosInstance.get<DoctorRetryRequestResponse>(
    `${ROUTES.DOCTOR.DOCTORREQUEST.GET}?token=${token}`,
  );


  return response.data.data;
};
