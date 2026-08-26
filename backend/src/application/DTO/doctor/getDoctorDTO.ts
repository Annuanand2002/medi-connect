import Doctor from "../../../domain/entities/doctor/doctor.entity";
import { DoctorStatus } from "../../../shared/constants/role.status";

export interface PaginationDoctorResDTO{
    requests : Doctor[];
    page : number;
    limit: number;
    total : number;
    totalPages : number;
}

export interface GetDoctorReqDTO {
  page: number;
  limit: number;
  status?: DoctorStatus;
  search?: string;
  department ?:string
}
