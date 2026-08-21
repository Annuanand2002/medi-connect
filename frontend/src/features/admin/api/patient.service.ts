import axiosInstance from "@/services/axios";
import type { PatientListResponse, Patients } from "../types/patientList";

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
    "/admin/patient",
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
    `/admin/patient/${id}`,
  );
  return response.data.data;
};
