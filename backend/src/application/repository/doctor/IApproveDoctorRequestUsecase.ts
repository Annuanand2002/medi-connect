import { ApproveDoctorRewuestDTO } from "../../DTO/doctorRequet/approveDoctorRequestSTO";

export interface IApproveDoctorRequestUsecase{
    execeute(request:ApproveDoctorRewuestDTO):Promise<void>
}