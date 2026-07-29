import axiosInstance from "@/shared/api/axios";
import type { ApproveDoctorPayload } from "../../../entites/doctor/approveDoctor.types";

export const approveDoctorRequest = async (
  data: ApproveDoctorPayload,
): Promise<void> => {
  await axiosInstance.patch("/admin/doctor-request/approve", data);
};
