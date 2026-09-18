import axiosInstance from "@/services/axios";
import type { LoginFormData } from "../schemas/loginSchema";

import type { LoginResponse } from "../types/authTypes";
import { ROUTES } from "@/constants/route";
import type { ApiResponse } from "@/types/api";

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


export const loginAdmin = async (
  credentials: LoginFormData,
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    ROUTES.ADMIN.AUTH.LOGIN,
    credentials,
  );
  return data;
};
export const logoutAdmin = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post(ROUTES.ADMIN.AUTH.LOGOUT);
  return data;
};


export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const { data } = await axiosInstance.post<RefreshTokenResponse>(
    ROUTES.ADMIN.AUTH.REFRESH_TOKEN,
  );
  return data;
};

