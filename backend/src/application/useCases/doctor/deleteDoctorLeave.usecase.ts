import { inject, injectable } from "inversify";
import { IDeleteDoctorLeaveUsecase } from "../../../domain/repositories/doctor/repo.usecase/IDeleteDoctorLeave.usecase";
import { TYPES } from "../../../di/types/types";
import { ILeaveDoctor } from "../../../domain/repositories/doctor/IDoctorLeave";
import { DoctorLeave } from "../../../domain/entities/doctor/doctorLeave";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class DeleteDoctorLeaveusecase implements IDeleteDoctorLeaveUsecase {
  constructor(
    @inject(TYPES.DoctorLeaveRepo)
    private _doctorLeave: ILeaveDoctor,
  ) {}
  async execute(id: string): Promise<DoctorLeave | null> {
    const leave = await this._doctorLeave.findById(id);
    if (!leave) {
      throw new AppError("Leave not found", HTTP_STATUS.NOT_FOUND);
    }
    if (leave.isDeleted === true) {
      throw new AppError("leave already deleted", HTTP_STATUS.CONFLICT);
    }
    const updated = await this._doctorLeave.update(id, {
      isDeleted: true,
    });
    return updated;
  }
}
