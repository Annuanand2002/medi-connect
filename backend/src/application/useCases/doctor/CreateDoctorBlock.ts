import { inject, injectable } from "inversify";
import { ICreateDoctorBlockUseCase } from "../../../domain/repositories/doctor/repo.usecase/ICreateDoctorBlock";
import { TYPES } from "../../../di/types/types";
import { IDoctorBlockRepo } from "../../../domain/repositories/doctor/IDoctorBlock";
import { DoctorBlock } from "../../../domain/entities/doctor/doctorBlock.entity";
import { createDoctorBlockDTO } from "../../DTO/doctor/doctorBlock.DTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { convertTimeToMinutes } from "../../../shared/utils/time.helper";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import { isDateCoveredByRRule } from "../../../shared/utils/getDayOfWeek";

@injectable()
export class CreateDoctorBlockUseCase implements ICreateDoctorBlockUseCase {
  constructor(
    @inject(TYPES.DoctorBlockRepo)
    private _doctorBlock: IDoctorBlockRepo,

    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAvail: IDoctorAvailabilityRepo,
  ) {}

  async execute(dto: createDoctorBlockDTO): Promise<DoctorBlock> {
    const { doctorId, date, startTime, endTime, reason } = dto;
    const blockDate = new Date(date);

    if (isNaN(blockDate.getTime())) {
      throw new AppError("Invalid date", HTTP_STATUS.BAD_REQUEST);
    }

    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      throw new AppError(
        "Time must be in HH:mm format",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const startMinutes = convertTimeToMinutes(startTime);

    const endMinutes = convertTimeToMinutes(endTime);

    if (startMinutes >= endMinutes) {
      throw new AppError(
        "Start time must be less than end time",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const availability = await this._doctorAvail.findAvailabilityForLeave(
      doctorId,
      blockDate,
      blockDate,
    );

    if (!availability.length) {
      throw new AppError(
        "The doctor is not available on the selected date",
        HTTP_STATUS.CONFLICT,
      );
    }

    const validAvailability = availability.filter((item) => {
      if (!item.recurrenceRule) {
        return false;
      }

      return isDateCoveredByRRule(new Date(blockDate), item.recurrenceRule);
    });

    if (!validAvailability.length) {
      throw new AppError(
        "The doctor is not available on the selected date",
        HTTP_STATUS.CONFLICT,
      );
    }

    const isWithinAvailability = availability.some((item) => {
      const availabilityStart = convertTimeToMinutes(item.startTime);

      const availabilityEnd = convertTimeToMinutes(item.endTime);
      if (startMinutes < availabilityStart || endMinutes > availabilityEnd) {
        return false;
      }

      const overlapsBreak = item.breaks.some((breakItem) => {
        const breakStart = convertTimeToMinutes(breakItem.startTime);

        const breakEnd = convertTimeToMinutes(breakItem.endTime);

        return startMinutes < breakEnd && endMinutes > breakStart;
      });

      return !overlapsBreak;
    });

    if (!isWithinAvailability) {
      throw new AppError(
        "Block time must be within the doctor's available time and cannot overlap a break",
        HTTP_STATUS.CONFLICT,
      );
    }

    const existing = await this._doctorBlock.findOverlappingBlock(
      doctorId,
      blockDate,
      startTime,
      endTime,
    );

    if (existing) {
      throw new AppError("Block time already exists", HTTP_STATUS.CONFLICT);
    }
    const block = await this._doctorBlock.create({
      doctorId,
      date: blockDate,
      startTime,
      endTime,
      reason,
      isDeleted: false,
    });

    return block;
  }
}
