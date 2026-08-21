import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import { IUpdateDoctorAvailabilityUseCase } from "../../../domain/repositories/doctor/repo.usecase/IUpdateDoctorAvail.usecase";
import { DoctorAvailability } from "../../../domain/entities/doctor/doctorAvailability";
import { CreateDoctorAvailabilityDTO } from "../../DTO/doctor/doctorAvailbilty";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class UpdateDoctorAvailabilityUseCase implements IUpdateDoctorAvailabilityUseCase {
  constructor(
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAVailRepo: IDoctorAvailabilityRepo,
  ) {}
  async execute(
    id: string,
    dto: CreateDoctorAvailabilityDTO,
  ): Promise<DoctorAvailability | null> {
    const existing = await this._doctorAVailRepo.findById(id);
    if (!existing) {
      throw new AppError("Doctor not found", HTTP_STATUS.NOT_FOUND);
    }
    const existingAvailability = await this._doctorAVailRepo.findByDoctorAndDay(
      dto.doctorId,
      dto.dayOfWeek,
    );
    if (existingAvailability && existingAvailability.id.toString() !== id) {
      throw new AppError("this day is already taken", HTTP_STATUS.CONFLICT);
    }
    if (dto.startTime >= dto.endTime) {
      throw new AppError(
        "Start time must be before end time",
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
    const availability: CreateDoctorAvailabilityDTO = {
      doctorId: dto.doctorId,
      dayOfWeek: dto.dayOfWeek,
      startTime: dto.startTime,
      endTime: dto.endTime,
      breaks: dto.breaks,
      isAvailable: dto.isAvailable ?? true,
      duration: dto.duration,
    };
    return await this._doctorAVailRepo.update(id, availability);
  }
}
