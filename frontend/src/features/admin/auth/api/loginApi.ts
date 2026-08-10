import axiosInstance from "@/services/axios";
import type { LoginFormData } from "../schemas/loginSchema";

import type { LoginResponse } from "../types/authTypes";

export const loginAdmin = async (
  credentials: LoginFormData,
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/admin/login",
    credentials,
  );
  return data;
};
