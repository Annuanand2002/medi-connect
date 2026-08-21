import { injectable } from "inversify";
import { DoctorResetToken } from "../../../domain/entities/doctor/doctorResetToken.entity";
import { IDoctorResetTokenRepo } from "../../../domain/repositories/doctor/IDoctorResetToken.repo";
import { DoctorResetTokenModel, DoctorResetTokenSchema } from "../../database/models/doctorResetToken.model";
import { DoctorResetTokenMapper } from "../../mappers/DoctorResetToken.mapper";
import { BaseRepository } from "../Base/base.repo.impl";


@injectable()
export class DoctorResetTokenRepo extends BaseRepository<DoctorResetTokenSchema,DoctorResetToken> implements IDoctorResetTokenRepo {
   constructor(){
    super(
      DoctorResetTokenModel,
      DoctorResetTokenMapper.toDomain,
      DoctorResetTokenMapper.toPersistence

    )
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
