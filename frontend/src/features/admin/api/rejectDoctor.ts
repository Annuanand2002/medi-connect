import axiosInstance from "@/services/axios";
import type { RejectDoctorPayload } from "../types/rejectDoctor.types";
import type { ApiResponse } from "@/types/api";
import { ROUTES } from "@/constants/route";

export const rejectDoctor = async ({
  doctorRequestId,
  rejectReason,
}: RejectDoctorPayload): Promise<void> => {
  await axiosInstance.patch<ApiResponse>(
    `${ROUTES.ADMIN.DOCTORREQUEST.REJECT}?id=${doctorRequestId}`,
    {
      rejectReason,
    },
  );
};
