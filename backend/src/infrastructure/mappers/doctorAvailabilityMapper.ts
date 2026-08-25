import { Types } from "mongoose";
import {
  DoctorAvailabilityDocument,
  DoctorAvailabilitySchema,
} from "../database/models/doctorAvailability";
import { DoctorAvailability } from "../../domain/entities/doctor/doctorAvailability";
import { getDayOfWeekFromRRule } from "../../shared/utils/getDayOfWeek";

export class DoctorAvailabilityMapper {
  static toDomain(
    document: DoctorAvailabilityDocument,
  ): DoctorAvailability {
    return {
      id: document._id.toString(),
      doctorId: document.doctorId.toString(),

      dayOfWeek: getDayOfWeekFromRRule(
        document.recurrenceRule,
      ),

      startTime: document.startTime,
      endTime: document.endTime,

      breaks: document.breaks.map((breakItem) => ({
        startTime: breakItem.startTime,
        endTime: breakItem.endTime,
      })),

      isAvailable: document.isAvailable,
      isDeleted: document.isDeleted,

      duration: document.duration,

      startDate: document.startDate,
      endDate: document.endDate,

      recurrenceRule: document.recurrenceRule,

      exceptions: document.exceptions.map((exception) => ({
        date: exception.date,
        startTime: exception.startTime,
        endTime: exception.endTime,

        breaks: exception.breaks.map((breakItem) => ({
          startTime: breakItem.startTime,
          endTime: breakItem.endTime,
        })),
      })),
    };
  }

  static toPersistence(
    entity: Partial<DoctorAvailability>,
  ): Partial<DoctorAvailabilitySchema> {
    return {
      doctorId: entity.doctorId
        ? new Types.ObjectId(entity.doctorId)
        : undefined,

      startTime: entity.startTime,
      endTime: entity.endTime,

      breaks: entity.breaks?.map((breakItem) => ({
        startTime: breakItem.startTime,
        endTime: breakItem.endTime,
      })),

      isAvailable: entity.isAvailable,
      isDeleted: entity.isDeleted,

      duration: entity.duration,

      startDate: entity.startDate,
      endDate: entity.endDate,

      recurrenceRule: entity.recurrenceRule,

      exceptions: entity.exceptions?.map((exception) => ({
        date: exception.date,

        startTime: exception.startTime,
        endTime: exception.endTime,

        breaks: exception.breaks.map((breakItem) => ({
          startTime: breakItem.startTime,
          endTime: breakItem.endTime,
        })),
      })),
    };
  }
}