import axiosInstance from "@/shared/api/axios";

import type { DoctorRequestListResponse } from "../../../entites/doctor/doctorRequestList.types";
import type { DoctorRequestDetails } from "../../../entites/doctor/doctorRequestDetials.types";

interface GetDoctorRequestsParams {
  page: number;
  limit: number;
  status?: string;
  search?: string;
}

export const getDoctorRequests = async ({
  page,
  limit,
  status,
  search,
}: GetDoctorRequestsParams) => {
  const response = await axiosInstance.get<DoctorRequestListResponse>(
    "/admin/doctor-request",
    {
      params: {
        page,
        limit,
        status,
        search,
      },
    },
  );

  return response.data;
};
export const getDoctorRequestById = async (
  id: string,
): Promise<DoctorRequestDetails> => {
  const response = await axiosInstance.get(`/admin/doctor-request/${id}`);
  return response.data.result!;
};
