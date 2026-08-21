import { Types } from "mongoose";
import { DoctorLeave } from "../../domain/entities/doctor/doctorLeave";
import {
  DoctorLeaveDocument,
  DoctorLeaveSchema,
} from "../database/models/doctorLeave";

export class DoctorLeaveMapper {
  static toDomain(document: DoctorLeaveDocument): DoctorLeave {
    return {
      id: document._id.toString(),

      doctorId: document.doctorId.toString(),

      startDate: document.startDate,

      endDate: document.endDate,

      reason: document.reason,
      isDeleted: document.isDeleted,

      createdAt: document.createdAt,

      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(
    entity: Partial<DoctorLeave>,
  ): Partial<DoctorLeaveSchema> {
    return {
      doctorId: entity.doctorId
        ? new Types.ObjectId(entity.doctorId)
        : undefined,

      startDate: entity.startDate,
      endDate: entity.endDate,
      isDeleted: entity.isDeleted,
      reason: entity.reason,
    };
  }
}
