import { PatientOtp } from "../../../domain/entities/patient/patientOtp.entity";
import { PatientOtpDocument } from "../models/patientOtp.model";

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

  static toPersistence(otp: PatientOtp) {
    return {
      patientId: otp.patientId,
      otp: otp.otp,
      expiresAt: otp.expiresAt,
      lastSentAt: otp.lastSentAt,
      resendCount: otp.resendCount,
    };
  }
}
