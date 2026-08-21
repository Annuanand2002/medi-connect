import { Types } from "mongoose";
import { PatientOtp } from "../../domain/entities/patient/patientOtp.entity";
import { PatientOtpDocument } from "../database/models/patientOtp.model";

export class PatientOtpMapper {
  static toDomain(document: PatientOtpDocument): PatientOtp {
    return {
      id: document._id.toString(),
      patientId: document.patientId.toString(),
      otp: document.otp,
      lastSentAt: document.lastSentAt,
      resendCount: document.resendCount,
      expiresAt: document.expiresAt,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(otp: Partial<PatientOtp>) {
    return {
      patientId: otp.patientId?new Types.ObjectId(otp.patientId):undefined,
      otp: otp.otp,
      expiresAt: otp.expiresAt,
      lastSentAt: otp.lastSentAt,
      resendCount: otp.resendCount,
    };
  }
}
