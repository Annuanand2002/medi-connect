import axiosInstance from "@/shared/api/axios";
import type { DoctorRequestResponse } from "../../../entites/doctor/doctorRequest.type";

export const applyDoctorRequest = async (
  formData: FormData,
): Promise<DoctorRequestResponse> => {
  const { data } = await axiosInstance.post("/doctor/apply", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
