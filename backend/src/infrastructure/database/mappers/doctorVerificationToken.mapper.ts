import DoctorVerificationToken from "../../../domain/entities/doctor/doctorVerificationToken.entity";
import { DoctorVerificationTokenDocument } from "../models/doctorVerificationToken.model";

export default class DoctorVerificationTokenMapper {
  static toDomain(
    document: DoctorVerificationTokenDocument
  ): DoctorVerificationToken {
    return {
      id: document._id.toString(),
      doctorId: document.doctorId.toString(),
      token: document.token,
      expiresAt: document.expiresAt,
      createdAt: document.createdAt,
    };
  }
}