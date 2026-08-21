import { injectable, inject } from "inversify";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { GetDoctorRequestDTO } from "../../DTO/doctorRequet/GetAllDoctorsRequestDTO";
import { PaginationDoctorRequestDTO } from "../../DTO/doctorRequet/PaginationDoctorRequestDTO";
import { TYPES } from "../../../di/types/types";
import { IGetAllDoctorRequedstUseCase } from "../../../domain/repositories/doctor/repo.usecase/IGetAllDoctorRequets";

@injectable()
export class GetAllDoctorRequestUseCase implements IGetAllDoctorRequedstUseCase {
  constructor(
    @inject(TYPES.DoctorRequestRepository)
    private _doctorRequestRepo: IDoctorRequest,
  ) {}
  async execute(dto: GetDoctorRequestDTO): Promise<PaginationDoctorRequestDTO> {
    return await this._doctorRequestRepo.findDoctorRequests(dto);
  }
}
