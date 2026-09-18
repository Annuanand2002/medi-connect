import axiosInstance from "@/services/axios";
import type { DoctorAvailResponse } from "../types/doctorAvail.type";
import type {
  CreateDoctorAvailability,
  CreateDoctorAvailResponse,
  UpdateDoctorAvailability,
  UpdateDoctorAvailResponse,
} from "../types/addDoctorAvail.type";
import { ROUTES } from "@/constants/route";

export const getDoctorAvailability = async (): Promise<DoctorAvailResponse> => {
  const response = await axiosInstance.get<DoctorAvailResponse>(
    ROUTES.DOCTOR.AVAIL.GET,
  );
  return response.data;
};

export const createDoctorAvailability = async (
  data: CreateDoctorAvailability,
): Promise<CreateDoctorAvailResponse> => {
  const response =
    await axiosInstance.post<CreateDoctorAvailResponse>(
      ROUTES.DOCTOR.AVAIL.CREATE,
      data,
    );

  return response.data;
};

export const updateDoctorAvailability = async (
  id: string,
  data: UpdateDoctorAvailability,
): Promise<UpdateDoctorAvailResponse> => {
  const response =
    await axiosInstance.post<UpdateDoctorAvailResponse>(
      `${ROUTES.DOCTOR.AVAIL.UPDATE}/${id}`,
      data,
    );

  return response.data;
};

export const delteDoctorAvailability = async (
  id: string,
): Promise<CreateDoctorAvailResponse> => {
  const response = await axiosInstance.patch(`${ROUTES.DOCTOR.AVAIL.UPDATE}/${id}`);
  return response.data;
};
