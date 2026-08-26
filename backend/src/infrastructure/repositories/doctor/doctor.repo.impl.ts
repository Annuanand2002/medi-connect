import Doctor from "../../../domain/entities/doctor/doctor.entity";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import DoctorModel, { DoctorSchema } from "../../database/models/doctor.model";
import { injectable } from "inversify";
import { BaseRepository } from "../Base/base.repo.impl";
import DoctorMapper from "../../mappers/DoctorMapper";
import {
  GetDoctorReqDTO,
  PaginationDoctorResDTO,
} from "../../../application/DTO/doctor/getDoctorDTO";

@injectable()
export class DoctorRepo
  extends BaseRepository<DoctorSchema, Doctor>
  implements IDoctorRepo
{
  constructor() {
    super(DoctorModel, DoctorMapper.toDomain, DoctorMapper.toPersistence);
  }
  async findByEmail(email: string): Promise<Doctor | null> {
    const doctor = await DoctorModel.findOne({ email: email.toLowerCase() });
    return doctor ? DoctorMapper.toDomain(doctor) : null;
  }
  async updateRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void> {
    await DoctorModel.findByIdAndUpdate(id, { refreshToken });
  }
  async countByDepartment(departmentId: string): Promise<number> {
    return await DoctorModel.countDocuments({
      departmentId,
      status: { $ne: "BLOCKED" },
    });
  }
  async findLastdoctor(): Promise<Doctor | null> {
    const doctor = await DoctorModel.findOne().sort({ createAt: -1 });
    return doctor ? DoctorMapper.toDomain(doctor) : null;
  }
  async findDoctors(dto: GetDoctorReqDTO): Promise<PaginationDoctorResDTO> {
    const { page, limit, status, department, search } = dto;
    const query: Record<string, unknown> = {};
    if (status) {
      query.status = status;
    }
    if (department) {
      query.department = department;
    }
    if (search) {
      query.$or = [
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          department: {
            $regex: search,
            $options: "i",
          },
        },
      ];
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
}
