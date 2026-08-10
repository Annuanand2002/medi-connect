import { injectable } from "inversify";
import { DoctorResetToken } from "../../../domain/entities/doctor/doctorResetToken.entity";
import { IDoctorResetTokenRepo } from "../../../domain/repositories/doctor/IDoctorResetToken.repo";
import { DoctorResetTokenMapper } from "../../database/mappers/DoctorResetToken.mapper";
import { DoctorResetTokenModel } from "../../database/models/doctorResetToken.model";

@injectable()
export class DoctorResetTokenRepo implements IDoctorResetTokenRepo {
  async create(data: DoctorResetToken): Promise<void> {
    const result = DoctorResetTokenMapper.toPersistence(data);
    await DoctorResetTokenModel.create(result);
  }
  async findByDoctorId(doctorId: string): Promise<DoctorResetToken | null> {
    const result = await DoctorResetTokenModel.findById(doctorId);
    if (!result) return null;
    return DoctorResetTokenMapper.toDomain(result);
  }
  async deleteByDoctorId(doctorId: string): Promise<void> {
    await DoctorResetTokenModel.deleteOne({ doctorId });
  }
  async deleteByToken(token: string): Promise<void> {
    await DoctorResetTokenModel.deleteOne({ token });
  }
  async findByToken(token: string): Promise<DoctorResetToken | null> {
    const resetToken = await DoctorResetTokenModel.findOne({ token });
    return resetToken ? DoctorResetTokenMapper.toDomain(resetToken) : null;
  }
}
