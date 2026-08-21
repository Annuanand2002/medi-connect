import axiosInstance from "@/services/axios";
import type {
  CreateDoctorBlock,
  CreateDoctorBlockResponse,
  DoctorBlockListResponse,
} from "../types/doctorBlock";

interface GetDoctorBlockRequestsParams {
  page: number;
  limit: number;
  date?: string;
  search?: string;
}

export const getDoctorBlock = async ({
  page,
  limit,
  date,
  search,
}: GetDoctorBlockRequestsParams): Promise<DoctorBlockListResponse> => {
  const response = await axiosInstance.get<DoctorBlockListResponse>(
    "/doctor/doctorBlock",
    {
      params: {
        page,
        limit,
        date,
        search,
      },
    },
  );
  return response.data;
};

export const createDoctorBlock = async (
  data: CreateDoctorBlock,
): Promise<CreateDoctorBlockResponse> => {
  const response = await axiosInstance.post<CreateDoctorBlockResponse>(
    "/doctor/doctorBlock/create",
    data,
  );
  return response.data;
};

export const updateDoctorBlock = async (
  id: string,
  data: CreateDoctorBlock,
): Promise<CreateDoctorBlockResponse> => {
  const response = await axiosInstance.put<CreateDoctorBlockResponse>(
    `/doctor/doctorBlock/${id}`,
    data,
  );
  return response.data;
};

export const deleteDoctorBlock = async (
  id: string,
): Promise<CreateDoctorBlockResponse> => {
  const response = await axiosInstance.patch<CreateDoctorBlockResponse>(
    `/doctor/doctorBlock/${id}`,
  );
  return response.data;
};
