import { injectable, inject } from "inversify";
import { IAppointmentCancel } from "../../../domain/repositories/patient/repo.usecase/IAppoinymentCancel";
import { AppointmentDet } from "../../DTO/patient/appointment";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import { TYPES } from "../../../di/types/types";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";

@injectable()
export class AppointmentCancel implements IAppointmentCancel {
  constructor(
    @inject(TYPES.AppoitmentRepo)
    private _appointmentRepo: IAppointmentRepo,
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
  ) {}
  async execute(id: string): Promise<AppointmentDet> {
    if (!id) {
      throw new AppError("appointment not found", HTTP_STATUS.NOT_FOUND);
    }
    const appointment = await this._appointmentRepo.update(id, {
      status: "CANCELLED",
    });
    if (!appointment) {
      throw new AppError(
        "Appointment cancelling failed",
        HTTP_STATUS.NOT_MODIFIED,
      );
    }
    const doctor = await this._doctorRepo.findById(appointment.doctorId);
    if (!doctor) {
      throw new AppError(
        "Appointmrnt cannot be canclled",
        HTTP_STATUS.NOT_MODIFIED,
      );
    }
    return {
      doctorId: appointment.doctorId,
      appointmentCode: appointment.appointmentCode,
      doctorName: doctor.fullName,
      doctorCode: doctor.doctorCode,
      date: appointment.appointmentDate,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      status: appointment.status,
      department: doctor.department,
    };
  }
}
