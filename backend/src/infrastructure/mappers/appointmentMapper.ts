import { Types } from "mongoose";
import {
  AppointmentDocument,
  AppointmentSchema,
} from "../database/models/appointment.model";
import { Appointment } from "../../domain/entities/patient/appointnent/appointment.entity";

export class AppointmentMapper {
  static toDomain(document: AppointmentDocument): Appointment {
    return {
      id: document._id.toString(),
      appointmentCode: document.appointmentCode,
      doctorId: document.doctorId.toString(),
      patientId: document.patientId.toString(),

      appointmentDate: document.appointmentDate,
      startTime: document.startTime,

      endTime: document.endTime,
      status: document.status,

      createdAt: document.createdAt,

      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(
    entity: Partial<Appointment>,
  ): Partial<AppointmentSchema> {
    return {
      appointmentCode: entity.appointmentCode,
      doctorId: entity.doctorId
        ? new Types.ObjectId(entity.doctorId)
        : undefined,
      patientId: entity.patientId
        ? new Types.ObjectId(entity.patientId)
        : undefined,

      appointmentDate: entity.appointmentDate,
      startTime: entity.startTime,
      endTime: entity.endTime,
      status: entity.status,
    };
  }
}
