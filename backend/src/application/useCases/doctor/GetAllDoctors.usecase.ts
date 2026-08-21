import { inject, injectable } from "inversify";
import { IGetAllDoctorUseCase } from "../../../domain/repositories/doctor/repo.usecase/IGetAllDoctor";
import {
  GetDoctorReqDTO,
  PaginationDoctorResDTO,
} from "../../DTO/doctor/getDoctorDTO";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import { TYPES } from "../../../di/types/types";

@injectable()
export class GetAllDoctorsUSeCase implements IGetAllDoctorUseCase {
  constructor(
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
  ) {}
  async execute(dto: GetDoctorReqDTO): Promise<PaginationDoctorResDTO> {
    return await this._doctorRepo.findDoctors(dto);
  }
}
