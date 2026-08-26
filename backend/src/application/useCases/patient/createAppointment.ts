import { inject, injectable } from "inversify";
import { ICreateAppointmentUseCase } from "../../../domain/repositories/patient/repo.usecase/ICreateAppointment.usecase";
import { TYPES } from "../../../di/types/types";
import { Appointment } from "../../../domain/entities/patient/appointnent/appointment.entity";
import { GetAppointmentDetailsDTO } from "../../DTO/patient/appointment";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";
import { ICounterRepo } from "../../../domain/repositories/common/ICounter";
import { generateCode } from "../../../shared/utils/GenerateCode";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import { ILeaveDoctor } from "../../../domain/repositories/doctor/IDoctorLeave";

@injectable()
export class CreateAppointmentUsecase implements ICreateAppointmentUseCase {
  constructor(
    @inject(TYPES.AppoitmentRepo)
    private _appointment: IAppointmentRepo,
    @inject(TYPES.CounterRepo)
    private _counterRepo: ICounterRepo,
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAvail: IDoctorAvailabilityRepo,
    @inject(TYPES.DoctorLeaveRepo)
    private _doctorLeave: ILeaveDoctor,
  ) {}

  async execute(
    patientId: string,
    dto: GetAppointmentDetailsDTO,
  ): Promise<Appointment> {
    const { doctorId, date, startTime, endTime } = dto;
    if (isNaN(date.getTime())) {
      throw new AppError("Invalid appointment date", HTTP_STATUS.BAD_REQUEST);
    }
    const existing = await this._appointment.findExistingAppointment(
      doctorId,
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
    const sequence = await this._counterRepo.getNextSequence("appointment");
    const appointmentCode = generateCode(sequence, "APP");
    return await this._appointment.create({
      patientId,
      doctorId,
      appointmentCode: appointmentCode,
      appointmentDate: date,
      startTime,
      endTime,
      status: "BOOKED",
    });
  }
}
