import axiosInstance from "@/services/axios";
import type {
  CreateDoctorLeave,
  CreateDoctorLeaveResponse,
  DoctorLeaveListResponse,
} from "../types/doctorLeave.type";
import { ROUTES } from "@/constants/route";

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
    ROUTES.DOCTOR.LEAVE.GET,
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
    ROUTES.DOCTOR.LEAVE.CREATE,
    data,
  );
  return response.data;
};

export const updateDoctorLeave = async (
  id: string,
  data: CreateDoctorLeave,
): Promise<CreateDoctorLeaveResponse> => {
  const response = await axiosInstance.put<CreateDoctorLeaveResponse>(
    `${ROUTES.DOCTOR.LEAVE.UPDATE}/${id}`,
    data,
  );
  return response.data;
};

export const deleteDoctorLeave = async (
  id: string,
): Promise<CreateDoctorLeaveResponse> => {
  const response = await axiosInstance.patch<CreateDoctorLeaveResponse>(
    `${ROUTES.DOCTOR.LEAVE.UPDATE}/${id}`,
  );
  return response.data;
};
