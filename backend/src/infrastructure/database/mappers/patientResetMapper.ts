import { Types } from "mongoose";
import { PatientResetTokenDocument } from "../models/patinetResetModel";
import { PatientResetToken } from "../../../domain/entities/patient/patientResetToken.entity";

export class PatientResetTokenMapper {
  static toDomain(document: PatientResetTokenDocument): PatientResetToken {
    return {
      id: document._id.toString(),
      patientId: document.patientId.toString(),
      token: document.token,
      expiresAt: document.expiresAt,
      createdAt: document.createdAt,
    };
  }

  static toPersistence(
    entity: PatientResetToken,
  ): Partial<PatientResetTokenDocument> {
    return {
      patientId: new Types.ObjectId(entity.patientId),
      token: entity.token,
      expiresAt: entity.expiresAt,
    };
  }
}
