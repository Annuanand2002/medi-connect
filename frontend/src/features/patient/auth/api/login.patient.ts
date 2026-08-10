import axiosInstance from "@/services/axios";
import type { LoginPatientResponse } from "../types/auth.patient.type";
import type { LoginPatientFormData } from "../schema/loginPatient.svhema";

export const loginPatient = async (
  credentials: LoginPatientFormData,
): Promise<LoginPatientResponse> => {
  const { data } = await axiosInstance.post<LoginPatientResponse>(
    "/patient/login",
    credentials,
  );
  return data;
};
