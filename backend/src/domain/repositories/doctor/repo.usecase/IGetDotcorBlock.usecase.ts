import { GetBlockReqDTO, PaginationDoctorBlockResDTO } from "../../../../application/DTO/doctor/doctorBlock.DTO";

export interface IGetDoctorBlockusecase {
    execute(dto:GetBlockReqDTO):Promise<PaginationDoctorBlockResDTO>
}