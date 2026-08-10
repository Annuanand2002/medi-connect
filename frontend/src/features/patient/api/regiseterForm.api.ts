import axiosInstance from "@/services/axios";
import type {
  PatientRegistrationRequest,
  PatientRegistrationResponse,
} from "../types/registerForm.Patient";

export const createPatient = async (
  data: PatientRegistrationRequest,
): Promise<PatientRegistrationResponse> => {
  const response = await axiosInstance.post<PatientRegistrationResponse>(
    "/patient/create-patient",
    data,
  );
  return response.data;
};
