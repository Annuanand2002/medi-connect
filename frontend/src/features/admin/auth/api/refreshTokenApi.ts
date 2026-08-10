import axiosInstance from "@/services/axios";

interface RefreshTokenResponse {
  success: boolean;
  message: string;
  result: {
    accessToken: string;
    admin: {
      id: string;
      email: string;
    };
  };
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const { data } = await axiosInstance.post<RefreshTokenResponse>(
    "/admin/refresh-token",
  );
  return data;
};
