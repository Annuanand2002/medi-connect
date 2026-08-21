import { inject, injectable } from "inversify";
import { IDeleteDoctorAvailUsecase } from "../../../domain/repositories/doctor/repo.usecase/IDeleteDotcorAvail.usecase";
import { TYPES } from "../../../di/types/types";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { DoctorAvailability } from "../../../domain/entities/doctor/doctorAvailability";

@injectable()
export class DeleteDoctorAvailUsecase implements IDeleteDoctorAvailUsecase {
  constructor(
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAvailRepo: IDoctorAvailabilityRepo,
  ) {}
  async execute(id: string): Promise<DoctorAvailability | null> {
    const doctor = await this._doctorAvailRepo.findById(id);
    if (!doctor) {
      throw new AppError("Doctor not found", HTTP_STATUS.NOT_FOUND);
    }
    if (doctor.isDeleted === true) {
      throw new AppError("This slot is already deleted", HTTP_STATUS.CONFLICT);
    }
    const updated = await this._doctorAvailRepo.update(id, {
      isDeleted: true,
    });
    return updated;
  }
}
