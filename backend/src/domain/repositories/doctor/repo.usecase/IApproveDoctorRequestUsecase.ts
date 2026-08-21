import { ApproveDoctorRewuestDTO } from "../../../../application/DTO/doctorRequet/approveDoctorRequestSTO";


export interface IApproveDoctorRequestUsecase{
    execeute(request:ApproveDoctorRewuestDTO):Promise<void>
}