import { AvailableTimeSlot } from "../../../application/DTO/patient/appointment";
import { Week } from "../../../shared/constants/week";
import { DoctorAvailability } from "../../entities/doctor/doctorAvailability";
import { IBaseRepository } from "../base/IBaseRepository";

export interface IDoctorAvailabilityRepo extends IBaseRepository<DoctorAvailability> {
  findAvailability(doctorId: string): Promise<DoctorAvailability[]>;

  findOverlapAvailability(
    doctorId: string,
    dayOfWeek: Week,
    startDate: Date,
    endDate: Date,
    excludeId?: string,
  ): Promise<DoctorAvailability | null>;

  findAvailabilityForLeave(
    doctorId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<DoctorAvailability[]>;

  findAvailabiltyForDate(
    doctorId: string,
    date: Date,
  ): Promise<DoctorAvailability[]>;
  getAvailabilityForDateRange(
    doctorId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<DoctorAvailability[]>;
  getAvailableSlots(
    doctorId: string,
    date: Date,
  ): Promise<DoctorAvailability | null>;
}
