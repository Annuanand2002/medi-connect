import { GetDoctorRequestDTO } from "../../../../application/DTO/doctorRequet/GetAllDoctorsRequestDTO";
import { PaginationDoctorRequestDTO } from "../../../../application/DTO/doctorRequet/PaginationDoctorRequestDTO";


export interface IGetAllDoctorRequedstUseCase{
    execute(dto:GetDoctorRequestDTO):Promise<PaginationDoctorRequestDTO>
}