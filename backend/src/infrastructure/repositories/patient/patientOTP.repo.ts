import { injectable } from "inversify";
import { IPatientOtpRepo } from "../../../domain/repositories/patient/IPatientOtp.repo";
import { PatientOtp } from "../../../domain/entities/patient/patientOtp.entity";
import PatientOtpModel, { PatientOtpSchema } from "../../database/models/patientOtp.model";
import { PatientOtpMapper } from "../../mappers/patientOTP.mapper";
import { BaseRepository } from "../Base/base.repo.impl";

@injectable()
export class PatientOTPRepo extends BaseRepository<PatientOtpSchema,PatientOtp> implements IPatientOtpRepo {
  constructor(){
    super(PatientOtpModel, PatientOtpMapper.toDomain,PatientOtpMapper.toPersistence);
  }
  // async create(data: PatientOtp): Promise<PatientOtp> {
  //   const otp = await PatientOtpModel.create(
  //     PatientOtpMapper.toPersistence(data),
  //   );
  //   return PatientOtpMapper.toDomain(otp);
  // }
  async findByPatientId(patientId: string): Promise<PatientOtp | null> {
    const otp = await PatientOtpModel.findOne({ patientId });
    if (!otp) return null;
    return PatientOtpMapper.toDomain(otp);
  }
  async deleteByPatientId(patientId: string): Promise<void> {
    await PatientOtpModel.deleteOne({ patientId });
  }
  // async update(
  //   patientId: string,
  //   data: Partial<PatientOtp>,
  // ): Promise<PatientOtp | null> {
  //   const updatedOTP = await PatientOtpModel.findOneAndUpdate(
  //     { patientId },
  //     data,
  //     { returnDocument: "after" },
  //   );
  //   return updatedOTP ? PatientOtpMapper.toDomain(updatedOTP) : null;
  // }
}
