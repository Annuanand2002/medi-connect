import { inject, injectable } from "inversify";
import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { IGetDoctorRequestUseCase } from "../../repository/doctor/IGetDoctorRequest.usecase";
import { TYPES } from "../../../di/types/types";

@injectable()
export class GetDoctorRequestUseCase implements IGetDoctorRequestUseCase {
  constructor(
    @inject(TYPES.DoctorRequestRepository)
    private _doctorReqRepo: IDoctorRequest,
  ) {}
  async execute(id: string): Promise<DoctorRequest | null> {
    return await this._doctorReqRepo.findById(id);
  }
}
