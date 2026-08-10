import axiosInstance from "@/services/axios";
import type { ApproveDoctorPayload } from "../types/approveDoctor.types";

export const approveDoctorRequest = async (
  data: ApproveDoctorPayload,
): Promise<void> => {
  await axiosInstance.patch("/admin/doctor-request/approve", data);
};
