import { injectable } from "inversify";
import { IPatientOtpRepo } from "../../../domain/repositories/patient/IPatientOtp.repo";
import { PatientOtp } from "../../../domain/entities/patient/patientOtp.entity";
import PatientOtpModel from "../../database/models/patientOtp.model";
import { PatientOtpMapper } from "../../database/mappers/patientOTP.mapper";

@injectable()
export class PatientOTPRepo implements IPatientOtpRepo {
  async create(data: PatientOtp): Promise<PatientOtp> {
    const otp = await PatientOtpModel.create(
      PatientOtpMapper.toPersistence(data),
    );
    return PatientOtpMapper.toDomain(otp);
  }
  async findByPatientId(patientId: string): Promise<PatientOtp | null> {
    const otp = await PatientOtpModel.findOne({ patientId });
    if (!otp) return null;
    return PatientOtpMapper.toDomain(otp);
  }
  async deleteByPatientId(patientId: string): Promise<void> {
    await PatientOtpModel.deleteOne({ patientId });
  }
  async update(patientId: string,data: Partial<PatientOtp>,): Promise<PatientOtp | null> {
    const updatedOTP = await PatientOtpModel.findOneAndUpdate(
      { patientId },
      data,
      { returnDocument: "after" },
    );
    return updatedOTP ? PatientOtpMapper.toDomain(updatedOTP) : null;
  }
}
