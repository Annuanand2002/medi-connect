import axiosInstance from "@/services/axios";

interface RefreshTokenPatientResponse {
  success: boolean;
  message: string;
  result: {
    accessToken: string;
    patient: {
      id: string;
      email: string;
      fullName: string;
      profileImg: string;
    };
  };
}

export const refreshPatientToken = async (): Promise<RefreshTokenPatientResponse> => {
  const { data } = await axiosInstance.post<RefreshTokenPatientResponse>(
    "/patient/refresh-token",
  );
  return data;
};
