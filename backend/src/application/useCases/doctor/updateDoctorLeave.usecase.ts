import { inject, injectable } from "inversify";
import { IUpdateDoctorLeaveUseCase } from "../../../domain/repositories/doctor/repo.usecase/IUpdateDoctorLeave";
import { TYPES } from "../../../di/types/types";
import { ILeaveDoctor } from "../../../domain/repositories/doctor/IDoctorLeave";
import { DoctorLeave } from "../../../domain/entities/doctor/doctorLeave";
import { CreateDoctorLeaveDTO } from "../../DTO/doctor/doctorLeave.DTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import { hasAvailableDateInRange } from "../../../shared/utils/availabilityRRule";

@injectable()
export class UpdateDoctorLeave implements IUpdateDoctorLeaveUseCase {
  constructor(
    @inject(TYPES.DoctorLeaveRepo)
    private _doctorLeave: ILeaveDoctor,
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAvail: IDoctorAvailabilityRepo,
  ) {}
  async execute(
    id: string,
    dto: CreateDoctorLeaveDTO,
  ): Promise<DoctorLeave | null> {
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
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const leave = await this._doctorLeave.findById(id);
    if (!leave) {
      throw new AppError("Leave to update is not found", HTTP_STATUS.NOT_FOUND);
    }
    if (leave.doctorId !== dto.doctorId) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const availability = await this._doctorAvail.findAvailabilityForLeave(
      dto.doctorId,
      startDate,
      endDate,
    );
    if (!availability.length || !availability) {
      throw new AppError(
        "The leave must be within the available schedule",
        HTTP_STATUS.CONFLICT,
      );
    }
    const isWithinAvailability = availability.some((item) => {
      const availabilityStart = new Date(item.startDate);
      const availabilityEnd = new Date(item.endDate);

      return startDate >= availabilityStart && endDate <= availabilityEnd;
    });

    if (!isWithinAvailability) {
      throw new AppError(
        "Leave dates must be within the availability period",
        HTTP_STATUS.CONFLICT,
      );
    }

    const hasAvailableDate = hasAvailableDateInRange(
      availability,
      startDate,
      endDate,
    );
    if (!hasAvailableDate) {
      throw new AppError(
        "The selected leave dates do not contain any available working day",
        HTTP_STATUS.CONFLICT,
      );
    }
    const existing = await this._doctorLeave.findOverLapLeave(
      dto.doctorId,
      startDate,
      endDate,
      id,
    );
    if (existing) {
      throw new AppError(
        "Another leave exists for the selected date range",
        HTTP_STATUS.CONFLICT,
      );
    }
    return await this._doctorLeave.update(id, {
      startDate,
      endDate,
      reason: dto.reason,
    });
  }
}
