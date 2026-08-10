import axiosInstance from "@/services/axios";

interface RefreshTokenDoctorResponse {
  success: boolean;
  message: string;
  result: {
    accessToken: string;
    doctor: {
      id: string;
      email: string;
      fullName: string;
      profileImg: string;
    };
  };
}

export const refreshDoctorToken = async (): Promise<RefreshTokenDoctorResponse> => {
  const { data } = await axiosInstance.post<RefreshTokenDoctorResponse>(
    "/doctor/refresh-token",
  );
  return data;
};
