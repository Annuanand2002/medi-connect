import axiosInstance from "@/services/axios";
import type { ApproveDoctorPayload } from "../types/approveDoctor.types";
import { ROUTES } from "@/constants/route";

export const approveDoctorRequest = async (
  data: ApproveDoctorPayload,
): Promise<void> => {
  await axiosInstance.patch(ROUTES.ADMIN.DOCTORREQUEST.APPROVE, data);
};
