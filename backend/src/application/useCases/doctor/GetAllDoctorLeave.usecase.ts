import { inject, injectable } from "inversify";
import { IGetDoctorLeaveUseCase } from "../../../domain/repositories/doctor/repo.usecase/IGetAllDoctorLeave.usecase";
import { TYPES } from "../../../di/types/types";
import { ILeaveDoctor } from "../../../domain/repositories/doctor/IDoctorLeave";
import {
  GetLeaveReqDTO,
  PaginationDoctorLeaveResDTO,
} from "../../DTO/doctor/doctorLeave.DTO";

@injectable()
export class GetAllDoctorLeaveUsecase implements IGetDoctorLeaveUseCase {
  constructor(
    @inject(TYPES.DoctorLeaveRepo)
    private _doctorLeave: ILeaveDoctor,
  ) {}
  async execute(dto: GetLeaveReqDTO): Promise<PaginationDoctorLeaveResDTO> {
    return await this._doctorLeave.findLeaves(dto);
  }
}
