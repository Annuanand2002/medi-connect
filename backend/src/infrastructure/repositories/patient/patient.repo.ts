import { injectable } from "inversify";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import { Patient } from "../../../domain/entities/patient/patient.entity";
import { BaseRepository } from "../Base/base.repo.impl";
import PatientModel, {
  PatientSchema,
} from "../../database/models/patient.model";
import { PatientMapper } from "../../mappers/Patient.Mapper";
import {
  GetPatientReqDTO,
  PaginationPatientResDTO,
} from "../../../application/DTO/patient/getPatient";

@injectable()
export class PatientRepo
  extends BaseRepository<PatientSchema, Patient>
  implements IPatientRepo
{
  constructor() {
    super(PatientModel, PatientMapper.toDomain, PatientMapper.toPersistence);
  }
  async create(data: Patient): Promise<Patient> {
    const document = await PatientModel.create(
      PatientMapper.toPersistence(data),
    );
    return PatientMapper.toDomain(document);
  }
  async findByEmail(email: string): Promise<Patient | null> {
    const document = await PatientModel.findOne({ email });
    if (!document) {
      return null;
    }
    return PatientMapper.toDomain(document);
  }
  async updateRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void> {
    await PatientModel.findByIdAndUpdate(id, { refreshToken });
  }
  async findPatient(dto: GetPatientReqDTO): Promise<PaginationPatientResDTO> {
    const { page, limit, search, isBlocked } = dto;
    const query: Record<string, unknown> = {};
    if (isBlocked) {
      query.isBlocked = isBlocked;
    }
    if (search) {
      query.$or = [
        {
          fullName: {
            $regex: search,
            $options: "i",
          }
        },
        {
          email: {
            $regex: search,
            $options: "i",
          }
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
