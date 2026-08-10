import axiosInstance from "@/services/axios";
import type { LoginDoctorFormData } from "../schema/doctorLoginform.schema";
import type { LoginDoctorResponse } from "../../types/login.type";

export const loginDoctor = async (
  credentials: LoginDoctorFormData,
): Promise<LoginDoctorResponse> => {
  const { data } = await axiosInstance.post<LoginDoctorResponse>(
    "/doctor/login",
    credentials,
  );
  return data;
};
