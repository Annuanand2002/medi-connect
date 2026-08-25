import { DoctorBlock } from "../../../domain/entities/doctor/doctorBlock.entity";

export interface GetBlockReqDTO {
  doctorId: string;
  page: number;
  limit: number;
  date?: string;
  search?: string;
}

export interface PaginationDoctorBlockResDTO {
  requests: DoctorBlock[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface createDoctorBlockDTO {
  doctorId: string;
  date : Date;
  startTime: string;
  endTime: string;
  reason: string;
}
