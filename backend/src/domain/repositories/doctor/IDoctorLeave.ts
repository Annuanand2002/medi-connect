import {
  GetLeaveReqDTO,
  PaginationDoctorLeaveResDTO,
} from "../../../application/DTO/doctor/doctorLeave.DTO";
import { DoctorLeave } from "../../entities/doctor/doctorLeave";
import { IBaseRepository } from "../base/IBaseRepository";

export interface ILeaveDoctor extends IBaseRepository<DoctorLeave> {
  findByDoctorAndDate(
    doctorId: string,
    date: Date,
  ): Promise<DoctorLeave | null>;
  findLeaves(dto: GetLeaveReqDTO): Promise<PaginationDoctorLeaveResDTO>;
  findOverLapLeave(
    doctorId: string,
    startDate: Date,
    endDate: Date,
    excludeId?: string,
  ): Promise<DoctorLeave | null>;

  findLeavesInRange(
    doctorId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<DoctorLeave[]>;
}
