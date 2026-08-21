import { GetDoctorReqDTO, PaginationDoctorResDTO } from "../../../../application/DTO/doctor/getDoctorDTO";

export interface IGetAllDoctorUseCase{
    execute(dto:GetDoctorReqDTO):Promise<PaginationDoctorResDTO>
}