import { inject, injectable } from "inversify";
import { IAppointmentDoctorReschedule } from "../../../domain/repositories/doctor/repo.usecase/IAppointmentDoctorReschdule.usecase";
import { SingleAppointmentDetails } from "../../DTO/doctor/appointment";
import { GetAppointmentRescheduleDetails } from "../../DTO/patient/appointment";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import { TYPES } from "../../../di/types/types";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class AppointmentDoctorReschedule implements IAppointmentDoctorReschedule {
  constructor(
    @inject(TYPES.AppoitmentRepo)
    private _appointmenytRepo: IAppointmentRepo,
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
  ) {}

  async execute(
    id: string,
    dto: GetAppointmentRescheduleDetails,
  ): Promise<SingleAppointmentDetails> {
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
    const appointment = await this._appointmenytRepo.findById(id);
    if (!appointment) {
      throw new AppError(
        "Failed to reschedule the appointment",
        HTTP_STATUS.NOT_FOUND,
      );
    }

    const existing = await this._appointmenytRepo.findExistingAppointment(
      appointment.patientId,
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
    const patient = await this._patientRepo.findById(appointment.patientId);
    if (!patient) {
      throw new AppError("Patient not found", HTTP_STATUS.NOT_FOUND);
    }
    const updatedAppointment = await this._appointmenytRepo.update(id, {
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
      patientId: updatedAppointment.patientId,
      patientName: patient.fullName,
      appointmentCode: updatedAppointment.appointmentCode,
      appointmentDate: updatedAppointment.appointmentDate,
      startTime: updatedAppointment.startTime,
      endTime: updatedAppointment.endTime,
      gender: patient.gender,
      email: patient.email,
      status: updatedAppointment.status,
    };
  }
}
