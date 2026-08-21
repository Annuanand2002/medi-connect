import { inject, injectable } from "inversify";
import { ICreateDoctorBlockUseCase } from "../../../domain/repositories/doctor/repo.usecase/ICreateDoctorBlock";
import { TYPES } from "../../../di/types/types";
import { IDoctorBlockRepo } from "../../../domain/repositories/doctor/IDoctorBlock";
import { DoctorBlock } from "../../../domain/entities/doctor/doctorBlock.entity";
import { createDoctorBlockDTO } from "../../DTO/doctor/doctorBlock.DTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { convertTimeToMinutes } from "../../../shared/utils/time.helper";

@injectable()
export class CreateDoctorBlockUseCase implements ICreateDoctorBlockUseCase {
  constructor(
    @inject(TYPES.DoctorBlockRepo)
    private _doctorBlock: IDoctorBlockRepo,
  ) {}
  async execute(dto: createDoctorBlockDTO): Promise<DoctorBlock> {
    const { doctorId, date, startTime, endTime, reason } = dto;
       const blockDate = new Date(date);

    if (isNaN(blockDate.getTime())) {
      throw new AppError(
        "Invalid date",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
      const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (
      !timeRegex.test(startTime) ||
      !timeRegex.test(endTime)
    ) {
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
    const exitsing = await this._doctorBlock.findOverlappingBlock(
      doctorId,
      new Date(date),
      startTime,
      endTime,
    );
    if (exitsing) {
      throw new AppError("Block time exist", HTTP_STATUS.CONFLICT);
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
