import axiosInstance from "@/services/axios";
import type {
  CreateDoctorBlock,
  CreateDoctorBlockResponse,
  DoctorBlockListResponse,
} from "../types/doctorBlock";
import { ROUTES } from "@/constants/route";

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
   ROUTES.DOCTOR.BLOCK.GET,
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
    ROUTES.DOCTOR.BLOCK.CREATE,
    data,
  );
  return response.data;
};

export const updateDoctorBlock = async (
  id: string,
  data: CreateDoctorBlock,
): Promise<CreateDoctorBlockResponse> => {
  const response = await axiosInstance.put<CreateDoctorBlockResponse>(
    `${ROUTES.DOCTOR.BLOCK.UPDATE}/${id}`,
    data,
  );
  return response.data;
};

export const deleteDoctorBlock = async (
  id: string,
): Promise<CreateDoctorBlockResponse> => {
  const response = await axiosInstance.patch<CreateDoctorBlockResponse>(
    `${ROUTES.DOCTOR.BLOCK.GET}/${id}`,
  );
  return response.data;
};
