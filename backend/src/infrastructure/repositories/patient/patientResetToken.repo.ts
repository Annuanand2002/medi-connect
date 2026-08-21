import { injectable } from "inversify";
import { IPatientResetTokenRepo } from "../../../domain/repositories/patient/IResetToken.repo";
import { PatientResetToken } from "../../../domain/entities/patient/patientResetToken.entity";
import { PatientResetTokenMapper } from "../../mappers/patientResetMapper";
import { PatientResetTokenModel } from "../../database/models/patinetResetModel";

@injectable()
export class PatientrResetTokenRepo implements IPatientResetTokenRepo {
  async create(data: PatientResetToken): Promise<void> {
    const result = PatientResetTokenMapper.toPersistence(data);
    await PatientResetTokenModel.create(result);
  }
  async findByPatientId(patientId: string): Promise<PatientResetToken | null> {
    const result = await PatientResetTokenModel.findById(patientId);
    if (!result) return null;
    return PatientResetTokenMapper.toDomain(result);
  }
  async deleteByPatientId(patientId: string): Promise<void> {
    await PatientResetTokenModel.deleteOne({ patientId });
  }
  async deleteByToken(token: string): Promise<void> {
    await PatientResetTokenModel.deleteOne({ token });
  }
  async findByToken(token: string): Promise<PatientResetToken | null> {
    const resetToken = await PatientResetTokenModel.findOne({ token });
    return resetToken ? PatientResetTokenMapper.toDomain(resetToken) : null;
  }
}
