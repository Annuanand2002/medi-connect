import axiosInstance from "@/services/axios";
import type { RejectDoctorPayload } from "../types/rejectDoctor.types";
import type { ApiResponse } from "@/types/api";

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
