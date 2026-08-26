import { inject, injectable } from "inversify";
import { IGetTimeSlotForAppointment } from "../../../domain/repositories/patient/repo.usecase/IAppoinmentTimeSlot";
import { TYPES } from "../../../di/types/types";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import { IDoctorBlockRepo } from "../../../domain/repositories/doctor/IDoctorBlock";
import { AvailableTimeSlot } from "../../DTO/patient/appointment";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { isDateAvailableFromRule } from "../../../shared/utils/availabilityRRule";
import {
  convertTimeToMinutes,
  minutesToTime,
} from "../../../shared/utils/time.helper";
import { IAppointmentRepo } from "../../../domain/repositories/patient/IAppointmentRepo";

@injectable()

export class GetTimeSlotUseCase
  implements IGetTimeSlotForAppointment
{
  constructor(
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAvail: IDoctorAvailabilityRepo,

    @inject(TYPES.AppoitmentRepo)
    private _appointment: IAppointmentRepo,

    @inject(TYPES.DoctorBlockRepo)
    private _doctorBlock: IDoctorBlockRepo,
  ) {}

  async execute(
    doctorId: string,
    date: Date,
  ): Promise<AvailableTimeSlot[]> {

    if (isNaN(date.getTime())) {
      throw new AppError(
        "Invalid date",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const availability =
      await this._doctorAvail.findAvailabiltyForDate(
        doctorId,
        date,
      );

    if (!availability.length) {
      return [];
    }

    const appointments =
      await this._appointment.findAppointmentsByDoctorAndDate(
        doctorId,
        date,
      );

    const blocks =
      await this._doctorBlock.findBlocksByDoctorAndDate(
        doctorId,
        date,
      );

    const slots: AvailableTimeSlot[] = [];

    for (const item of availability) {

      const isAvailableOnSelectedDate =
        isDateAvailableFromRule(
          item.recurrenceRule,
          date,
        );

      if (!isAvailableOnSelectedDate) {
        continue;
      }

      const availabilityStart =
        convertTimeToMinutes(item.startTime);

      const availabilityEnd =
        convertTimeToMinutes(item.endTime);

      const duration = item.duration;

      if (!duration || duration <= 0) {
        continue;
      }

      let currentTime = availabilityStart;

      while (
        currentTime + duration <= availabilityEnd
      ) {

        const slotStart = currentTime;
        const slotEnd = currentTime + duration;

        const overlapsBreak = item.breaks.some(
          (breakItem) => {
            const breakStart =
              convertTimeToMinutes(
                breakItem.startTime,
              );

            const breakEnd =
              convertTimeToMinutes(
                breakItem.endTime,
              );

            return (
              slotStart < breakEnd &&
              slotEnd > breakStart
            );
          },
        );

        const overlapsAppointment =
          appointments.some((appointment) => {

            const appointmentStart =
              convertTimeToMinutes(
                appointment.startTime,
              );

            const appointmentEnd =
              convertTimeToMinutes(
                appointment.endTime,
              );

            return (
              slotStart < appointmentEnd &&
              slotEnd > appointmentStart
            );
          });

        const overlapsBlock =
          blocks.some((block) => {

            const blockStart =
              convertTimeToMinutes(
                block.startTime,
              );

            const blockEnd =
              convertTimeToMinutes(
                block.endTime,
              );

            return (
              slotStart < blockEnd &&
              slotEnd > blockStart
            );
          });

        if (
          !overlapsBreak &&
          !overlapsAppointment &&
          !overlapsBlock
        ) {
          slots.push({
            startTime: minutesToTime(slotStart),
            endTime: minutesToTime(slotEnd),
            isAvailable: true,
          });
        }

        currentTime += duration;
      }
    }

    return slots;
  }
}
