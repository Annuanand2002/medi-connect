import axiosInstance from "@/services/axios";
import type { DoctorAvailResponse } from "../types/doctorAvail.type";
import type {
  CreateDoctorAvailability,
  CreateDoctorAvailResponse,
} from "../types/addDoctorAvail.type";

export const getDoctorAvailability = async (): Promise<DoctorAvailResponse> => {
  const response = await axiosInstance.get<DoctorAvailResponse>(
    "/doctor/doctorAvail",
  );
  console.log(response.data);
  return response.data;
};

export const createDoctorAvailability = async (
  data: CreateDoctorAvailability,
): Promise<CreateDoctorAvailResponse> => {
  const response = await axiosInstance.post<CreateDoctorAvailResponse>(
    "/doctor/doctorAvail/create",
    data,
  );
  return response.data;
};

export const updateDoctorAvailability = async (
  id: string,
  data: CreateDoctorAvailability,
): Promise<CreateDoctorAvailResponse> => {
  const response = await axiosInstance.post(`/doctor/doctorAvail/${id}`, data);
  return response.data;
};

export const delteDoctorAvailability = async (
  id: string,
): Promise<CreateDoctorAvailResponse> => {
  const response = await axiosInstance.patch(`/doctor/doctorAvail/${id}`);
  return response.data;
};
