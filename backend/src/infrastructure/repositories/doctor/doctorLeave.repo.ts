import { injectable } from "inversify";
import { ILeaveDoctor } from "../../../domain/repositories/doctor/IDoctorLeave";
import DoctorLeaveModel, {
  DoctorLeaveSchema,
} from "../../database/models/doctorLeave";
import { BaseRepository } from "../Base/base.repo.impl";
import {
  GetLeaveReqDTO,
  PaginationDoctorLeaveResDTO,
} from "../../../application/DTO/doctor/doctorLeave.DTO";
import { DoctorLeave } from "../../../domain/entities/doctor/doctorLeave";
import { DoctorLeaveMapper } from "../../mappers/doctorLeave";

@injectable()
export class DoctorLeaveRepo
  extends BaseRepository<DoctorLeaveSchema, DoctorLeave>
  implements ILeaveDoctor
{
  constructor() {
    super(
      DoctorLeaveModel,
      DoctorLeaveMapper.toDomain,
      DoctorLeaveMapper.toPersistence,
    );
  }
  async findLeaves(dto: GetLeaveReqDTO): Promise<PaginationDoctorLeaveResDTO> {
    const { page, limit, doctorId, date, search } = dto;
    const query: Record<string, unknown> = {
      doctorId,
      isDeleted: false,
    };
    if (date) {
      query.startDate = {
        $lte: new Date(date),
      };
      query.endDate = {
        $gte: new Date(date),
      };
    }
    if (search) {
      query.reason = {
        $regex: search,
        $options: "i",
      };
    }
    const result = await super.findAll(page, limit, query);
    return {
      requests: result.data,
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    };
  }
  async findByDoctorAndDate(
    doctorId: string,
    date: Date,
  ): Promise<DoctorLeave | null> {
    const leave = await DoctorLeaveModel.findOne({
      doctorId,
      startDate: { $lte: date },
      endDate: { $gte: date },
      isDeleted: false,
    });
    if (!leave) return null;
    return DoctorLeaveMapper.toDomain(leave);
  }
  async findOverLapLeave(
    doctorId: string,
    startDate: Date,
    endDate: Date,
    excludeId?: string,
  ): Promise<DoctorLeave | null> {
    const query: Record<string, unknown> = {
      doctorId,
      isDeleted: false,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const leave = await DoctorLeaveModel.findOne(query);
    if (!leave) return null;
    return DoctorLeaveMapper.toDomain(leave);
  }
}
