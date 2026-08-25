import { Types } from "mongoose";
import { DoctorBlock } from "../../domain/entities/doctor/doctorBlock.entity";
import {
  DoctorBlockDocument,
  DoctorBlockSchema,
} from "../database/models/doctorBlock";

export class DoctorBlockMapper {
  static toDomain(document: DoctorBlockDocument): DoctorBlock {
    return {
      id: document._id.toString(),

      doctorId: document.doctorId.toString(),

      date : document.date,

      startTime: document.startTime,

      endTime: document.endTime,

      reason: document.reason,

      isDeleted: document.isDeleted,

      createdAt: document.createdAt,

      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(
    entity: Partial<DoctorBlock>,
  ): Partial<DoctorBlockSchema> {
    return {
      doctorId: entity.doctorId
        ? new Types.ObjectId(entity.doctorId)
        : undefined,
      date : entity.date,
      startTime: entity.startTime,
      endTime: entity.endTime,
      isDeleted: entity.isDeleted,
      reason: entity.reason,
    };
  }
}
