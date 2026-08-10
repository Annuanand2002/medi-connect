import { injectable, inject } from "inversify";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { GetDoctorRequestDTO } from "../../DTO/doctorRequet/GetAllDoctorsRequestDTO";
import { PaginationDoctorRequestDTO } from "../../DTO/doctorRequet/PaginationDoctorRequestDTO";
import { IGetAllDoctorRequedstUseCase } from "../../repository/doctor/IGetAllDoctorRequets";
import { TYPES } from "../../../di/types/types";

@injectable()
export class GetAllDoctorRequestUseCase implements IGetAllDoctorRequedstUseCase {
  constructor(
    @inject(TYPES.DoctorRequestRepository)
    private _doctorRequestRepo: IDoctorRequest,
  ) {}
  async execute(dto: GetDoctorRequestDTO): Promise<PaginationDoctorRequestDTO> {
    return await this._doctorRequestRepo.findAll(dto);
  }
}
