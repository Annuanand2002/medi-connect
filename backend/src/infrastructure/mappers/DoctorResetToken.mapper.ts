import { Types } from "mongoose";
import { DoctorResetTokenDocument } from "../database/models/doctorResetToken.model";
import { DoctorResetToken } from "../../domain/entities/doctor/doctorResetToken.entity";



export class DoctorResetTokenMapper {
  static toDomain(document: DoctorResetTokenDocument): DoctorResetToken {
    return {
      id: document._id.toString(),
      doctorId: document.doctorId.toString(),
      token: document.token,
      expiresAt: document.expiresAt,
      createdAt: document.createdAt,
    };
  }

  static toPersistence(
    entity: Partial<DoctorResetToken>,
  ): Partial<DoctorResetTokenDocument> {
    return {
      doctorId: new Types.ObjectId(entity.doctorId),
      token: entity.token,
      expiresAt: entity.expiresAt,
    };
  }
}
