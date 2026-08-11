import axiosInstance from "@/services/axios";

export const refreshPatientToken = async () => {
  const response = await axiosInstance.post(
    "/patient/refresh-token"
  );

  return response.data;
};