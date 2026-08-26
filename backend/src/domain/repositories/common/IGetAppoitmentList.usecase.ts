import { GetAppointmentReqDTO, PaginationAppointmenttResDTO } from "../../../application/DTO/patient/getAppointmentRepo";

export interface IGetAppointmentsUsecase {
    execute(id:string,dto:GetAppointmentReqDTO):Promise<PaginationAppointmenttResDTO>
}