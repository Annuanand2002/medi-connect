import axiosInstance from "@/shared/api/axios";
import type { RejectDoctorPayload } from "../../../entites/doctor/rejectDoctor.types";
import type { ApiResponse } from "@/entites/api";

export const rejectDoctor = async ({
  doctorRequestId,
  rejectReason,
}: RejectDoctorPayload): Promise<void> => {
  await axiosInstance.patch<ApiResponse>(
    `/admin/doctor-request/reject?id=${doctorRequestId}`,
    {
      rejectReason,
    },
  );
};
