import { inject, injectable } from "inversify";
import { ICreateDoctorAvailUseCase } from "../../../domain/repositories/doctor/repo.usecase/IDoctorAvaulabilityCreate.usecase";
import { TYPES } from "../../../di/types/types";
import { DoctorAvailability } from "../../../domain/entities/doctor/doctorAvailability";
import { CreateDoctorAvailabilityDTO } from "../../DTO/doctor/doctorAvailbilty";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class CreateDoctorAvailUseCase implements ICreateDoctorAvailUseCase {
  constructor(
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAvailRepo: IDoctorAvailabilityRepo,
  ) {}
  async exceute(dto: CreateDoctorAvailabilityDTO): Promise<DoctorAvailability> {
    const existingAvailability = await this._doctorAvailRepo.findByDoctorAndDay(
      dto.doctorId,
      dto.dayOfWeek,
    );
    if (existingAvailability) {
      throw new AppError("This day is taken", HTTP_STATUS.CONFLICT);
    }
    if (dto.startTime >= dto.endTime) {
      throw new AppError(
        "start time must not be greater than end time",
        HTTP_STATUS.CONFLICT,
      );
    }
    for (const breakItem of dto.breaks) {
      if (breakItem.startTime >= breakItem.endTime) {
        throw new AppError(
          "Break start time must be before break end time",
          HTTP_STATUS.CONFLICT,
        );
      }
      if (
        breakItem.startTime < dto.startTime ||
        breakItem.endTime > dto.endTime
      ) {
        throw new AppError(
          "Break must be within availability time",
          HTTP_STATUS.NOT_ACCEPTABLE,
        );
      }
    }
    return await this._doctorAvailRepo.create({
      doctorId: dto.doctorId,
      dayOfWeek: dto.dayOfWeek,
      startTime: dto.startTime,
      endTime: dto.endTime,
      breaks: dto.breaks,
      isAvailable: dto.isAvailable ?? true,
      duration: dto.duration,
      isDeleted: false,
    });
  }
}
