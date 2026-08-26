import { injectable, inject } from "inversify";
import { IGetAppointmentDetailsUseCase } from "../../../domain/repositories/patient/repo.usecase/IAppointmentConfrim";
import {
  GetAppointmentDetailsDTO,
  AppointmentDetails,
} from "../../DTO/patient/appointment";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { TYPES } from "../../../di/types/types";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import { DoctorStatus } from "../../../shared/constants/role.status";

@injectable()
export class GetAppointmentDetailsUseCase implements IGetAppointmentDetailsUseCase {
  constructor(
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
  ) {}

  async execute(dto: GetAppointmentDetailsDTO): Promise<AppointmentDetails> {
    const { doctorId, date, startTime, endTime } = dto;

    if (!doctorId) {
      throw new AppError("Doctor ID is required", HTTP_STATUS.BAD_REQUEST);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new AppError("Invalid appointment date", HTTP_STATUS.BAD_REQUEST);
    }

    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      throw new AppError("Invalid appointment time", HTTP_STATUS.BAD_REQUEST);
    }

    const doctor = await this._doctorRepo.findById(doctorId);

    if (!doctor) {
      throw new AppError("Doctor not found", HTTP_STATUS.NOT_FOUND);
    }

    if (doctor.status !== DoctorStatus.ACTIVE) {
      throw new AppError(
        "Doctor is not available for appointments",
        HTTP_STATUS.CONFLICT,
      );
    }
    if (!doctor.doctorCode) {
      throw new AppError("Doctor code not found", HTTP_STATUS.NOT_FOUND);
    }

    return {
      doctorId,
      doctorName: doctor.fullName,
      doctorCode: doctor.doctorCode,
      department: doctor.department,
      date,
      startTime,
      endTime,
    };
  }
}
