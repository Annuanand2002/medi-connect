import axiosInstance from "@/services/axios";
import type { DoctorRequestListResponse } from "../types/doctorRequestList.types";
import type { DoctorRequestDetails } from "../types/doctorRequestDetials.types";
import type { Doctor, DoctorListResponse } from "../types/doctorList";
import { ROUTES } from "@/constants/route";


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
    ROUTES.ADMIN.DOCTORREQUEST.GETREQUESTS,
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
  const response = await axiosInstance.get(`${ROUTES.ADMIN.DOCTORREQUEST.GETREQUEST}/${id}`);
  return response.data.data!;
};

export const getDoctor = async ({
  page,
  limit,
  status,
  search,
}: GetDoctorRequestsParams) => {
  const response = await axiosInstance.get<DoctorListResponse>(
    ROUTES.ADMIN.DOCTOR.GET,
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
    `${ROUTES.ADMIN.DOCTOR.GET}/${id}`,
  );
  return response.data.data;
};
