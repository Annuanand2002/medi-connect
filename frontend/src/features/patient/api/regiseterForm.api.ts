import axiosInstance from "@/services/axios";
import type {
  PatientRegistrationRequest,
  PatientRegistrationResponse,
} from "../types/registerForm.Patient";
import { ROUTES } from "@/constants/route";

export const createPatient = async (
  data: PatientRegistrationRequest,
): Promise<PatientRegistrationResponse> => {
  console.log("Startong....");
  console.log("Startong....");
  console.log("API BASE URL:", axiosInstance.defaults.baseURL);
  const response = await axiosInstance.post<PatientRegistrationResponse>(
    ROUTES.PATIENT.REGISTER.CREATE,
    data,
  );
  return response.data;
};
