import { inject, injectable } from "inversify";
import { IAppointmentDetails } from "../../../domain/repositories/patient/repo.usecase/IAppointmentDetails";
import { AppointmentDet } from "../../DTO/patient/appointment";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import { TYPES } from "../../../di/types/types";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class AppointmentDeatilsPage implements IAppointmentDetails {
  constructor(
    @inject(TYPES.AppoitmentRepo)
    private _appointmentRepo: IAppointmentRepo,
    @inject(TYPES.DoctorRepo)
    private _doctprRepo: IDoctorRepo,
  ) {}
  async execute(appointmentId: string): Promise<AppointmentDet> {
    if (!appointmentId) {
      throw new AppError("id not found", HTTP_STATUS.NOT_FOUND);
    }
    const appointment = await this._appointmentRepo.findById(appointmentId);
    if (!appointment) {
      throw new AppError("appointment not found", HTTP_STATUS.NOT_FOUND);
    }
    const doctor = await this._doctprRepo.findById(appointment.doctorId);
    if (!doctor) {
      throw new AppError(
        "soemthing went wrong with your appointmnet",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    return {
      appointmentCode: appointment.appointmentCode,
      doctorId: appointment.doctorId,
      doctorCode: doctor.doctorCode,
      doctorName: doctor.fullName,
      department: doctor.department,
      status: appointment.status,
      date: appointment.appointmentDate,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
    };
  }
}
