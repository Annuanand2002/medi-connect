import { inject, injectable } from "inversify";
import { IUpdateDoctorLeaveUseCase } from "../../../domain/repositories/doctor/repo.usecase/IUpdateDoctorLeave";
import { TYPES } from "../../../di/types/types";
import { ILeaveDoctor } from "../../../domain/repositories/doctor/IDoctorLeave";
import { DoctorLeave } from "../../../domain/entities/doctor/doctorLeave";
import { createDoctorLeaveDTO } from "../../DTO/doctor/doctorLeave.DTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class UpdateDoctorLeave implements IUpdateDoctorLeaveUseCase {
  constructor(
    @inject(TYPES.DoctorLeaveRepo)
    private _doctorLeave: ILeaveDoctor,
  ) {}
  async execute(
    id: string,
    dto: createDoctorLeaveDTO,
  ): Promise<DoctorLeave | null> {
    const leave = await this._doctorLeave.findById(id);
    if (!leave) {
      throw new AppError("Leave to update is not found", HTTP_STATUS.NOT_FOUND);
    }
    const existing = await this._doctorLeave.findOverLapLeave(
      dto.doctorId,
      dto.startDate,
      dto.endDate,
      id,
    );
    if (existing) {
      throw new AppError(
        "Another leave exist for this selected date",
        HTTP_STATUS.CONFLICT,
      );
    }
    const update = await this._doctorLeave.update(id, dto);
    return update;
  }
}
