import { inject, injectable } from "inversify";
import { IUpdateDoctorBlockUsecase } from "../../../domain/repositories/doctor/repo.usecase/IUpdateDoctor.usecae";
import { TYPES } from "../../../di/types/types";
import { IDoctorBlockRepo } from "../../../domain/repositories/doctor/IDoctorBlock";
import { DoctorBlock } from "../../../domain/entities/doctor/doctorBlock.entity";
import { createDoctorBlockDTO } from "../../DTO/doctor/doctorBlock.DTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { convertTimeToMinutes } from "../../../shared/utils/time.helper";

@injectable()
export class UpdateDoctorBlockUsecase implements IUpdateDoctorBlockUsecase {
  constructor(
    @inject(TYPES.DoctorBlockRepo)
    private _doctorBlock: IDoctorBlockRepo,
  ) {}

  async execute(
    id: string,
    dto: createDoctorBlockDTO,
  ): Promise<DoctorBlock | null> {
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
    const existingBlock = await this._doctorBlock.findById(id);
    if (!existingBlock || existingBlock.isDeleted) {
      throw new AppError("block not found", HTTP_STATUS.NOT_FOUND);
    }
    if (existingBlock.doctorId !== doctorId) {
      throw new AppError(
        "You are not allowed to update this block",
        HTTP_STATUS.FORBIDDEN,
      );
    }
    const overlap = await this._doctorBlock.findOverlappingBlock(
      doctorId,
      new Date(date),
      startTime,
      endTime,
      id,
    );
    if (overlap) {
      throw new AppError(
        "block time already exist.Please choose another time",
        HTTP_STATUS.CONFLICT,
      );
    }
    const updated = await this._doctorBlock.update(id, {
      doctorId,
      date: blockDate,
      startTime,
      endTime,
      reason,
      isDeleted: false,
    });
    return updated;
  }
}
