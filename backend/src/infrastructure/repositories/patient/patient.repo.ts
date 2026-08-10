import { injectable } from "inversify";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import { Patient } from "../../../domain/entities/patient/patient.entity";
import { BaseRepository } from "../Base/base.repo.impl";
import PatientModel, {
  PatientSchema,
} from "../../database/models/patient.model";
import { PatientMapper } from "../../database/mappers/Patient.Mapper";

@injectable()
export class PatientRepo
  extends BaseRepository<PatientSchema, Patient>
  implements IPatientRepo
{
  constructor() {
    super(PatientModel, PatientMapper.toDomain);
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
  async update(id: string, data: Partial<Patient>): Promise<Patient | null> {
    const document = await PatientModel.findByIdAndUpdate(
      id,
      PatientMapper.toPersistence(data),
      { new: true },
    );
    if (!document) return null;
    return PatientMapper.toDomain(document);
  }
  async updateRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void> {
    await PatientModel.findByIdAndUpdate(id, { refreshToken });
  }
}
