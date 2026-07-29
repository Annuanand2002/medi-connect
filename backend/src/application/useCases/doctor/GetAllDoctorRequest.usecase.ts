import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { GetDoctorRequestDTO } from "../../DTO/doctorRequet/GetAllDoctorsRequestDTO";
import { PaginationDoctorRequestDTO } from "../../DTO/doctorRequet/PaginationDoctorRequestDTO";
import { IGetAllDoctorRequedstUseCase } from "../../repository/doctor/IGetAllDoctorRequets";

export class GetAllDoctorRequestUseCase implements IGetAllDoctorRequedstUseCase {
  constructor(private doctorRequestRepo: IDoctorRequest) {}
  async execute(dto: GetDoctorRequestDTO): Promise<PaginationDoctorRequestDTO> {
    return await this.doctorRequestRepo.findAll(dto);
  }
}
