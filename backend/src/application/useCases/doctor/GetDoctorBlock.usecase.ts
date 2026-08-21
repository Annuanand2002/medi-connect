import { inject, injectable } from "inversify";
import { IGetDoctorBlockusecase } from "../../../domain/repositories/doctor/repo.usecase/IGetDotcorBlock.usecase";
import { TYPES } from "../../../di/types/types";
import { IDoctorBlockRepo } from "../../../domain/repositories/doctor/IDoctorBlock";
import {
  GetBlockReqDTO,
  PaginationDoctorBlockResDTO,
} from "../../DTO/doctor/doctorBlock.DTO";

@injectable()
export class GetDoctorBlockUsecase implements IGetDoctorBlockusecase {
  constructor(
    @inject(TYPES.DoctorBlockRepo)
    private _doctorBlock: IDoctorBlockRepo,
  ) {}

  async execute(dto: GetBlockReqDTO): Promise<PaginationDoctorBlockResDTO> {
    return await this._doctorBlock.findBlocks(dto);
  }
}
