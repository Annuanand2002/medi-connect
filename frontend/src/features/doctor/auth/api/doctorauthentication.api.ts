import axiosInstance from "@/services/axios";
import type { LoginDoctorFormData } from "../schema/doctorLoginform.schema";
import type { LoginDoctorResponse } from "../types/authAdmin.type";
import { ROUTES } from "@/constants/route";
import type { ApiResponse } from "@/types/api";

export const loginDoctor = async (
  credentials: LoginDoctorFormData,
): Promise<LoginDoctorResponse> => {
  const { data } = await axiosInstance.post<LoginDoctorResponse>(
    ROUTES.DOCTOR.AUTH.LOGIN,
    credentials,
  );
  return data;
};


export const logoutDoctor = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post(ROUTES.DOCTOR.AUTH.LOGOUT);
  return data;
};

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
    ROUTES.DOCTOR.AUTH.REFRESH_TOKEN,
  );
  return data;
};


