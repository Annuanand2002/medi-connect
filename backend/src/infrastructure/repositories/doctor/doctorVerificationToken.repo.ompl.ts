import { injectable } from "inversify";
import DoctorVerificationToken from "../../../domain/entities/doctor/doctorVerificationToken.entity";
import IDoctorVerificationTokenRepo from "../../../domain/repositories/doctor/IDoctorVerificationTokenRepo";
import DoctorVerificationTokenMapper from "../../database/mappers/doctorVerificationToken.mapper";
import DoctorVerificationTokenModel from "../../database/models/doctorVerificationToken.model";

@injectable()
export default class DoctorVerificationTokenRepository implements IDoctorVerificationTokenRepo {
  async create(
    data: Partial<DoctorVerificationToken>,
  ): Promise<DoctorVerificationToken> {
    const token = await DoctorVerificationTokenModel.create(data);

    return DoctorVerificationTokenMapper.toDomain(token);
  }

  async findByToken(token: string): Promise<DoctorVerificationToken | null> {
    const verificationToken = await DoctorVerificationTokenModel.findOne({
      token,
    });

    return verificationToken
      ? DoctorVerificationTokenMapper.toDomain(verificationToken)
      : null;
  }

  async deleteByToken(token: string): Promise<void> {
    await DoctorVerificationTokenModel.deleteOne({
      token,
    });
  }

  async deleteByDoctorId(doctorId: string): Promise<void> {
    await DoctorVerificationTokenModel.deleteOne({
      doctorId,
    });
  }
}
