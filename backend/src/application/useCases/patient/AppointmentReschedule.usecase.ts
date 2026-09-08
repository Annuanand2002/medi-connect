import { inject, injectable } from "inversify";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import { IAppointmentReschedule } from "../../../domain/repositories/patient/repo.usecase/IAppointmentREschedule";
import {
  AppointmentDet,
  GetAppointmentRescheduleDetails,
} from "../../DTO/patient/appointment";
import { TYPES } from "../../../di/types/types";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";

@injectable()
export class AppointmentReschedule implements IAppointmentReschedule {
  constructor(
    @inject(TYPES.AppoitmentRepo)
    private _appointmentRepo: IAppointmentRepo,
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
  ) {}
  async execute(
    id: string,
    dto: GetAppointmentRescheduleDetails,
  ): Promise<AppointmentDet> {
    if (!id) {
      throw new AppError("appointment not found", HTTP_STATUS.NOT_FOUND);
    }
    const { date, startTime, endTime } = dto;
    if (isNaN(date.getTime())) {
      throw new AppError("inavlid appointment date", HTTP_STATUS.BAD_REQUEST);
    }
    if (!startTime || !endTime) {
      throw new AppError(
        "Start time and end time are required",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const appointment = await this._appointmentRepo.findById(id);
    if (!appointment) {
      throw new AppError(
        "Failed to reschedule the appointment",
        HTTP_STATUS.NOT_FOUND,
      );
    }

    const existing = await this._appointmentRepo.findExistingAppointment(
      appointment.doctorId,
      date,
      startTime,
      endTime,
    );
    if (existing) {
      throw new AppError(
        "The selected time slot is already booked",
        HTTP_STATUS.CONFLICT,
      );
    }
    const doctor = await this._doctorRepo.findById(appointment.doctorId);
    if (!doctor) {
      throw new AppError(
        "appointment reschedule failed",
        HTTP_STATUS.NOT_FOUND,
      );
    }
    const updatedAppointment = await this._appointmentRepo.update(id, {
      appointmentDate: date,
      startTime,
      endTime,
      status: "RESCHEDULED",
    });
    if (!updatedAppointment) {
      throw new AppError(
        "appointment update failed",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      doctorId: updatedAppointment.doctorId,
      appointmentCode: updatedAppointment.appointmentCode,
      date: updatedAppointment.appointmentDate,
      startTime: updatedAppointment.startTime,
      endTime: updatedAppointment.endTime,
      doctorName: doctor.fullName,
      doctorCode: doctor.doctorCode,
      department: doctor.department,
      status: updatedAppointment.status,
    };
  }
}
