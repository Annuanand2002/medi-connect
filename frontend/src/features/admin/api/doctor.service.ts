import axiosInstance from "@/services/axios";
import type { DoctorRequestListResponse } from "../types/doctorRequestList.types";
import type { DoctorRequestDetails } from "../types/doctorRequestDetials.types";
import type { Doctor, DoctorListResponse } from "../types/doctorList";


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
  return response.data.data!;
};

export const getDoctor = async ({
  page,
  limit,
  status,
  search,
}: GetDoctorRequestsParams) => {
  const response = await axiosInstance.get<DoctorListResponse>(
    "/admin/doctor",
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

export const toggleDoctorStatus = async (
  id: string,
):Promise<Doctor> => {
  const response = await axiosInstance.patch(
    `/admin/doctor/${id}`,
  );
  return response.data.data;
};
