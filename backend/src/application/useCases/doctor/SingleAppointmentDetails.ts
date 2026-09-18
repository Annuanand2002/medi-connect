import { inject, injectable } from "inversify";
import { ISingleAppointmentDetails } from "../../../domain/repositories/doctor/repo.usecase/IgetSingleAppointment.usecase";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import { TYPES } from "../../../di/types/types";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import { SingleAppointmentDetails } from "../../DTO/doctor/appointment";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";


@injectable()
export class SingleAppointmenytDetails implements ISingleAppointmentDetails {
  constructor(
    @inject(TYPES.AppoitmentRepo)
    private _appointmentRepo: IAppointmentRepo,
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
  ) {}
  async execute(id: string): Promise<SingleAppointmentDetails> {
    if (!id) {
      throw new AppError("Appointment not found", HTTP_STATUS.NOT_FOUND);
    }
    const appointment = await this._appointmentRepo.findById(id);
    if (!appointment) {
      throw new AppError("appointment not found", HTTP_STATUS.NOT_FOUND);
    }
    const patient = await this._patientRepo.findById(appointment.patientId);
    if (!patient) {
      throw new AppError("Patient not found", HTTP_STATUS.NOT_FOUND);
    }
    return {
      appointmentCode: appointment.appointmentCode,
      patientName: patient.fullName,
      gender: patient.gender,
      status: appointment.status,
      appointmentDate: appointment.appointmentDate,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      patientId: appointment.patientId,
      email: patient.email,
    };
  }
}
