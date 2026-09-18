import axiosInstance from "@/services/axios";
import type { DoctorRequestResponse } from "../types/doctorRequest.type";
import { ROUTES } from "@/constants/route";

export const applyDoctorRequest = async (
  formData: FormData,
): Promise<DoctorRequestResponse> => {
  const { data } = await axiosInstance.post(ROUTES.DOCTOR.DOCTORREQUEST.APPLY, formData);

  return data;
};
