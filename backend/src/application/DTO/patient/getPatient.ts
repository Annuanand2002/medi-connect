import { Patient } from "../../../domain/entities/patient/patient.entity";
import { PatientStatus } from "../../../shared/constants/role.status";

export interface PaginationPatientResDTO {
  requests: Patient[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetPatientReqDTO {
  page: number;
  limit: number;
  isBlocked?: PatientStatus;
  search?: string;
}
