import axiosInstance from "@/services/axios";
import type { PatientListResponse, Patients } from "../types/patientList";
import { ROUTES } from "@/constants/route";

interface GetPatientRequestParams {
  page: number;
  limit: number;
  status?: string;
  search?: string;
}

export const getPatient = async ({
  page,
  limit,
  status,
  search,
}: GetPatientRequestParams) => {
  const response = await axiosInstance.get<PatientListResponse>(
    ROUTES.ADMIN.PATIENT.GET,
    {
      params: {
        page,
        limit,
        status,
        search,
      },
    },
  );
  return response.data;
};

export const togglePatientStatus = async (
  id: string,
):Promise<Patients> => {
  const response = await axiosInstance.patch(
    `${ROUTES.ADMIN.PATIENT.GET}/${id}`,
  );
  return response.data.data;
};
