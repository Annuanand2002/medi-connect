import { DoctorRequestStatus } from "../../../shared/constants/role.status";

export interface GetDoctorRequestDTO {
  page: number;
  limit: number;
  status?: DoctorRequestStatus;
  search?: string;
}
