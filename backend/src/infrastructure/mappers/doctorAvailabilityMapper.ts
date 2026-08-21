import { Types } from "mongoose";
import {
  DoctorAvailabilityDocument,
  DoctorAvailabilitySchema,
} from "../database/models/doctorAvailability";
import { DoctorAvailability } from "../../domain/entities/doctor/doctorAvailability";

export class DoctorAvailabilityMapper {
  static toDomain(document: DoctorAvailabilityDocument): DoctorAvailability {
    return {
      id: document._id.toString(),

      doctorId: document.doctorId.toString(),

      dayOfWeek: document.dayOfWeek,

      startTime: document.startTime,

      endTime: document.endTime,

      breaks: document.breaks.map((breakItem) => ({
        startTime: breakItem.startTime,
        endTime: breakItem.endTime,
      })),

      isAvailable: document.isAvailable,
      isDeleted: document.isDeleted,
      duration: document.duration,

      createdAt: document.createdAt,

      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(
    entity: Partial<DoctorAvailability>,
  ): Partial<DoctorAvailabilitySchema> {
    return {
      doctorId: entity.doctorId
        ? new Types.ObjectId(entity.doctorId)
        : undefined,

      dayOfWeek: entity.dayOfWeek,

      startTime: entity.startTime,

      endTime: entity.endTime,

      breaks: entity.breaks?.map((breakItem) => ({
        startTime: breakItem.startTime,
        endTime: breakItem.endTime,
      })),

      isAvailable: entity.isAvailable,
      isDeleted: entity.isDeleted,
      duration: entity.duration,
    };
  }
}
