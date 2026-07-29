
import { GetDoctorRequestDTO } from "../../DTO/doctorRequet/GetAllDoctorsRequestDTO";
import { PaginationDoctorRequestDTO } from "../../DTO/doctorRequet/PaginationDoctorRequestDTO";

export interface IGetAllDoctorRequedstUseCase{
    execute(dto:GetDoctorRequestDTO):Promise<PaginationDoctorRequestDTO>
}