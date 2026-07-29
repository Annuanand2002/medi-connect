import axiosInstance from "@/shared/api/axios";
import type { LoginFormData } from "../schemas/loginSchema";

import type { LoginResponse } from "../../../../entites/admin/authTypes";

export const loginAdmin = async (
  credentials: LoginFormData,
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/admin/login",
    credentials,
  );
  return data;
};
