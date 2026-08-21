import axiosInstance from "@/services/axios";
import type {
  CreateDoctorLeave,
  CreateDoctorLeaveResponse,
  DoctorLeaveListResponse,
} from "../types/doctorLeave.type";

interface GetDoctorLeaveRequestsParams {
  page: number;
  limit: number;
  date?: string;
  search?: string;
}
export const getDoctorLeave = async ({
  page,
  limit,
  date,
  search,
}: GetDoctorLeaveRequestsParams): Promise<DoctorLeaveListResponse> => {
  const response = await axiosInstance.get<DoctorLeaveListResponse>(
    "/doctor/doctorLeave",
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

export const createDoctorLeave = async (
  data: CreateDoctorLeave,
): Promise<CreateDoctorLeaveResponse> => {
  const response = await axiosInstance.post<CreateDoctorLeaveResponse>(
    "/doctor/doctorLeave/create",
    data,
  );
  return response.data;
};

export const updateDoctorLeave = async (
  id: string,
  data: CreateDoctorLeave,
): Promise<CreateDoctorLeaveResponse> => {
  const response = await axiosInstance.put<CreateDoctorLeaveResponse>(
    `/doctor/doctorLeave/update/${id}`,
    data,
  );
  return response.data;
};

export const deleteDoctorLeave = async (
  id: string,
): Promise<CreateDoctorLeaveResponse> => {
  const response = await axiosInstance.patch<CreateDoctorLeaveResponse>(
    `/doctor/doctorLeave/update/${id}`,
  );
  return response.data;
};
