import { injectable, inject } from "inversify";
import { DoctorAvailability } from "../../../domain/entities/doctor/doctorAvailability";
import { IGetDoctorAvailUsecase } from "../../../domain/repositories/doctor/repo.usecase/IGetDoctorAvailability";
import { TYPES } from "../../../di/types/types";
import { IDoctorAvailabilityRepo } from "../../../domain/repositories/doctor/IDoctorAvailability";

@injectable()
export class GetDoctorAvailUsecase implements IGetDoctorAvailUsecase {
  constructor(
    @inject(TYPES.DoctorAvailabilityRepo)
    private _doctorAvailRepo: IDoctorAvailabilityRepo,
  ) {}
  async execute(doctorId: string): Promise<DoctorAvailability[]> {
    return await this._doctorAvailRepo.findAvailability(doctorId);
  }
}
