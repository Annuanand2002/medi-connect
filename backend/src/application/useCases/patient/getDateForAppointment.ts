import { inject, injectable } from "inversify";
import { IGetDatesForAppointmentUsecase } from "../../../domain/repositories/patient/repo.usecase/IAppointmentDate";
import { TYPES } from "../../../di/types/types";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import { PatientRequestDate, Dates } from "../../DTO/patient/appointment";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { getDatesFromAvailabilityRule } from "../../../shared/utils/availabilityRRule";
import { ILeaveDoctor } from "../../../domain/repositories/doctor/IDoctorLeave";

@injectable()
export class GetDatesForAppointment
  implements IGetDatesForAppointmentUsecase
{
  constructor(
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAvil: IDoctorAvailabilityRepo,

    @inject(TYPES.DoctorLeaveRepo)
    private _doctorLeave: ILeaveDoctor,
  ) {}

  async execute(dto: PatientRequestDate): Promise<Dates[]> {
    const { doctorId, startDate, endDate } = dto;

    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      throw new AppError(
        "Invalid start date or end date",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    if (startDate > endDate) {
      throw new AppError(
        "startDate must be less than endDate",
        HTTP_STATUS.NOT_ACCEPTABLE,
      );
    }
    const availability =
      await this._doctorAvil.getAvailabilityForDateRange(
        doctorId,
        startDate,
        endDate,
      );

    if (!availability.length) {
      return [];
    }
    const availableDates: Dates[] = [];
  
    for (const item of availability) {
      const start =
        item.startDate > startDate
          ? item.startDate
          : startDate;

      const end =
        item.endDate < endDate
          ? item.endDate
          : endDate;

      const dates = getDatesFromAvailabilityRule({
        recurrenceRule: item.recurrenceRule,
        startDate: start,
        endDate: end,
      });

      for (const date of dates) {
        availableDates.push({ date });
      }
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const uniqueDates = new Map<string, Dates>();

    for (const item of availableDates) {
        const date = new Date(item.date)
         date.setHours(0, 0, 0, 0);
         if (date <= today) {
    continue;
  }
      const key = item.date.toISOString().split("T")[0];

      uniqueDates.set(key, item);
    }

    let result = Array.from(uniqueDates.values());
    const leaves = await this._doctorLeave.findLeavesInRange(
      doctorId,
      startDate,
      endDate,
    );

    result = result.filter((item) => {
      return !leaves.some((leave) => {
        return (
          item.date >= leave.startDate &&
          item.date <= leave.endDate
        );
      });
    });
    return result.sort(
      (a, b) =>
        a.date.getTime() - b.date.getTime(),
    );
  }
}