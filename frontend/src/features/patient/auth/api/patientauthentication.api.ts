import axiosInstance from "@/services/axios";
import type { LoginPatientResponse } from "../types/auth.patient.type";
import type { LoginPatientFormData } from "../schema/loginPatient.svhema";
import { ROUTES } from "@/constants/route";
import type { ApiResponse } from "@/types/api";

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

export const loginPatient = async (
  credentials: LoginPatientFormData,
): Promise<LoginPatientResponse> => {
  const { data } = await axiosInstance.post<LoginPatientResponse>(
    ROUTES.PATIENT.AUTH.LOGIN,
    credentials,
  );
  return data;
};

export const logoutPatient = async (): Promise<ApiResponse> => {
  const { data } = await axiosInstance.post(ROUTES.PATIENT.AUTH.LOGOUT);
  return data;
};

export const refreshPatientToken =
  async (): Promise<RefreshTokenPatientResponse> => {
    const { data } = await axiosInstance.post<RefreshTokenPatientResponse>(
      ROUTES.PATIENT.AUTH.REFRESH_TOKEN,
    );
    return data;
  };
