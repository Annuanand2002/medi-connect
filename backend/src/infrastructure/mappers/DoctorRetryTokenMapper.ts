import { Types } from "mongoose";
import { DoctorRetryToken } from "../../domain/entities/doctor/doctorRetryToken";
import { DoctorRetryTokenDocument } from "../database/models/doctorRetryTokenModel";

export class DoctorRetryTokenMapper {
  static toDomain(document: DoctorRetryTokenDocument): DoctorRetryToken {
    return {
      id: document._id.toString(),
      doctorRequestId: document.doctorRequestId.toString(),
      token: document.token,
      expiresAt: document.expiresAt,
      createdAt: document.createdAt,
    };
  }

  static toPersistence(
    entity: DoctorRetryToken,
  ): Partial<DoctorRetryTokenDocument> {
    return {
      doctorRequestId: new Types.ObjectId(entity.doctorRequestId),
      token: entity.token,
      expiresAt: entity.expiresAt,
    };
  }
}
