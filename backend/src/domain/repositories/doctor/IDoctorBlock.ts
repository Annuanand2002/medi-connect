import {
  GetBlockReqDTO,
  PaginationDoctorBlockResDTO,
} from "../../../application/DTO/doctor/doctorBlock.DTO";
import { DoctorBlock } from "../../entities/doctor/doctorBlock.entity";
import { IBaseRepository } from "../base/IBaseRepository";

export interface IDoctorBlockRepo extends IBaseRepository<DoctorBlock> {
  findBlocks(dto: GetBlockReqDTO): Promise<PaginationDoctorBlockResDTO>;
  findByDoctorId(doctorId: string): Promise<DoctorBlock[]>;
  findByDoctorAndDate(doctorId: string, date: Date): Promise<DoctorBlock[]>;
  findOverlappingBlock(
    doctorId: string,
    date: Date,
    startTime: string,
    endTime: string,
    excludeId?: string,
  ): Promise<DoctorBlock | null>;
}
