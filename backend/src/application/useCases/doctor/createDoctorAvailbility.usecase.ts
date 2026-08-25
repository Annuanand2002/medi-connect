import { inject, injectable } from "inversify";
import { ICreateDoctorAvailUseCase } from "../../../domain/repositories/doctor/repo.usecase/IDoctorAvaulabilityCreate.usecase";
import { TYPES } from "../../../di/types/types";
import { DoctorAvailability } from "../../../domain/entities/doctor/doctorAvailability";
import { CreateDoctorAvailabilityDTO } from "../../DTO/doctor/doctorAvailbilty";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { createAvailabilityRRule } from "../../../shared/utils/availabilityRRule";
import { convertTimeToMinutes } from "../../../shared/utils/time.helper";

@injectable()
export class CreateDoctorAvailUseCase implements ICreateDoctorAvailUseCase {
  constructor(
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAvailRepo: IDoctorAvailabilityRepo,
  ) {}
  async exceute(
    doctorId: string,
    dto: CreateDoctorAvailabilityDTO,
  ): Promise<DoctorAvailability[]> {
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
        "start date must be less than endDate",
        HTTP_STATUS.CONFLICT,
      );
    }
    if (!dto.days.length) {
      throw new AppError(
        "At least one day must be selected",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const createdAvailability: DoctorAvailability[] = [];
    for (const day of dto.days) {
      if (day.startTime >= day.endTime) {
        throw new AppError(
          `Start time must be less than end time for ${day.dayOfWeek}`,
          HTTP_STATUS.CONFLICT,
        );
      }
      for (const breakItem of day.breaks) {
        if (breakItem.startTime >= breakItem.endTime) {
          throw new AppError(
            `Break start time must be less than break end time for ${day.dayOfWeek}`,
            HTTP_STATUS.CONFLICT,
          );
        }
        const availabilityStart = convertTimeToMinutes(day.startTime);
        const availabilityEnd = convertTimeToMinutes(day.endTime);

        const breakStart = convertTimeToMinutes(breakItem.startTime);
        const breakEnd = convertTimeToMinutes(breakItem.endTime);

        if (breakStart < availabilityStart || breakEnd > availabilityEnd) {
          throw new AppError(
            `Break must be within availability time for ${day.dayOfWeek}`,
            HTTP_STATUS.NOT_ACCEPTABLE,
          );
        }
      }
      const existingAvailabily =
        await this._doctorAvailRepo.findOverlapAvailability(
          doctorId,
          day.dayOfWeek,
          startDate,
          endDate,
        );
      if (existingAvailabily) {
        throw new AppError(
          `Availability already exists for ${day.dayOfWeek} in the selected date range`,
          HTTP_STATUS.CONFLICT,
        );
      }
      const recurrenceRule = createAvailabilityRRule({
        startDate,
        endDate,
        days: [day.dayOfWeek],
      });
      const availability = await this._doctorAvailRepo.create({
        doctorId,
        startTime: day.startTime,
        endTime: day.endTime,
        breaks: day.breaks,
        isAvailable: true,
        isDeleted: false,
        duration: day.duration,
        startDate: startDate,
        endDate: endDate,
        recurrenceRule,
        exceptions: [],
      });
      createdAvailability.push(availability);
    }
    return createdAvailability;
  }
}
