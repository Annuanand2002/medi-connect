import { inject, injectable } from "inversify";
import { IDeleteDoctorBlockUseCase } from "../../../domain/repositories/doctor/repo.usecase/IDeleteDoctor.usecase";
import { TYPES } from "../../../di/types/types";
import { IDoctorBlockRepo } from "../../../domain/repositories/doctor/IDoctorBlock";
import { DoctorBlock } from "../../../domain/entities/doctor/doctorBlock.entity";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class DeleteDoctorBlockUsecase implements IDeleteDoctorBlockUseCase {
  constructor(
    @inject(TYPES.DoctorBlockRepo)
    private _doctorBlock: IDoctorBlockRepo,
  ) {}

  async execute(doctorId: string, id: string): Promise<DoctorBlock | null> {
    const block = await this._doctorBlock.findById(id);
    if (!block) {
      throw new AppError("blcok not found", HTTP_STATUS.NOT_FOUND);
    }
    if (block.doctorId !== doctorId) {
      throw new AppError("unauthorized doctor", HTTP_STATUS.UNAUTHORIZED);
    }
    if (block.isDeleted) {
      throw new AppError("Block is already deleted", HTTP_STATUS.CONFLICT);
    }
    return await this._doctorBlock.update(id, { isDeleted: true });
  }
}
