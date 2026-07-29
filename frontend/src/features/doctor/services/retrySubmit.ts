import axiosInstance from "@/shared/api/axios";
import type { DoctorRequestResponse } from "../../../entites/doctor/doctorRequest.type";

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
