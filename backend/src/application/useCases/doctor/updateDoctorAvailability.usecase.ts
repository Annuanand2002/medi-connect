import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import { IUpdateDoctorAvailabilityUseCase } from "../../../domain/repositories/doctor/repo.usecase/IUpdateDoctorAvail.usecase";
import { DoctorAvailability } from "../../../domain/entities/doctor/doctorAvailability";
import {
  UpdateDoctorAvailabilityDTO,
} from "../../DTO/doctor/doctorAvailbilty";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { createAvailabilityRRule } from "../../../shared/utils/availabilityRRule";

@injectable()
export class UpdateDoctorAvailabilityUseCase implements IUpdateDoctorAvailabilityUseCase {
  constructor(
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAVailRepo: IDoctorAvailabilityRepo,
  ) {}
  async execute(
    id: string,
    dcotorId: string,
    dto: UpdateDoctorAvailabilityDTO,
  ): Promise<DoctorAvailability | null> {
    const existing = await this._doctorAVailRepo.findById(id);
    if (!existing) {
      throw new AppError("Slot doesnt exist", HTTP_STATUS.NOT_FOUND);
    }
    if (existing.doctorId !== dcotorId) {
      throw new AppError(
        "You are not authorized to update this availability",
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new AppError(
        "Invalid start date or end date",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    if (startDate >= endDate) {
      throw new AppError(
        "Start date must be before end date",
        HTTP_STATUS.CONFLICT,
      );
    }
    const existingAvailability =
      await this._doctorAVailRepo.findOverlapAvailability(
        dcotorId,
        dto.dayOfWeek,
        startDate,
        endDate,
        id
      );
    if (existingAvailability) {
      throw new AppError(
        "This day already has availability in the selected date range",
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
    const recurrenceRule  = createAvailabilityRRule({
      startDate,
      endDate,
      days : [dto.dayOfWeek]
    })
    return await this._doctorAVailRepo.update(id, {
      startTime: dto.startTime,
      endTime: dto.endTime,
      duration: dto.duration,
      startDate,
      endDate,
      breaks: dto.breaks,
      recurrenceRule ,
      exceptions : existing.exceptions
    });
  }
}
