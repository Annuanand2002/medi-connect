import axiosInstance from "@/services/axios";
import type { DoctorRequestResponse } from "../types/doctorRequest.type";

export const retryDoctorRequest = async (
  formData: FormData,
): Promise<DoctorRequestResponse> => {
  const { data } = await axiosInstance.post("/doctor/retry", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
