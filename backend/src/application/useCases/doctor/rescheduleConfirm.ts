import { injectable, inject } from "inversify";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { TYPES } from "../../../di/types/types";

import { IGetRescheduleDetailsUseCase } from "../../../domain/repositories/doctor/repo.usecase/IReschedukeConfirm.usecase";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import {
  DoctorAppointmentDet,
  DoctorGetAppointmentDetailsDTO,
} from "../../DTO/doctor/appointment";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";

@injectable()
export class DoctorGetRescheduleDetailsUseCase implements IGetRescheduleDetailsUseCase {
  constructor(
    @inject(TYPES.AppoitmentRepo)
    private _appointmentRepo: IAppointmentRepo,
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
  ) {}
  async execute(
    dto: DoctorGetAppointmentDetailsDTO,
  ): Promise<DoctorAppointmentDet> {
    const { appointmentId, date, startTime, endTime } = dto;
       console.log()
    if (!appointmentId) {
      throw new AppError("Appointment not found", HTTP_STATUS.BAD_REQUEST);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new AppError("Invalid appointment date", HTTP_STATUS.BAD_REQUEST);
    }

    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      throw new AppError("Invalid appointment time", HTTP_STATUS.BAD_REQUEST);
    }
    const appointment = await this._appointmentRepo.findById(appointmentId);
    if (!appointment) {
      throw new AppError("appointment not found", HTTP_STATUS.NOT_FOUND);
    }
    const patient = await this._patientRepo.findById(appointment.patientId);
    if (!patient) {
      throw new AppError("Patient not fond", HTTP_STATUS.NOT_FOUND);
    }
    return {
      appointmentCode: appointment.appointmentCode,
      patientId: appointment.patientId,
      patientName: patient.fullName,
      gender: patient.gender,
      patientCode: patient.patientCode,
      date: appointment.appointmentDate,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status,
      id: appointment.id,
    };
  }
}
