import { DoctorLeave } from "../../../domain/entities/doctor/doctorLeave";

export interface GetLeaveReqDTO {
  doctorId: string;
  page: number;
  limit: number;
  date?: string;
  search?: string;
}

export interface PaginationDoctorLeaveResDTO {
  requests: DoctorLeave[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateDoctorLeaveDTO {
    doctorId : string;
    startDate : Date;
    endDate : Date;
    reason : string;
}
