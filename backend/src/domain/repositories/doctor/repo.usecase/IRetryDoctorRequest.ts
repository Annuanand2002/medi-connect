import { RetryDoctorRequestDTO } from "../../../../application/DTO/doctorRequet/retryDoctorRequest.update.DTO";
import DoctorRequest from "../../../entities/doctor/doctorRequestEntity";


export interface IRetryDoctorRequestUseCase{
    execute(request:RetryDoctorRequestDTO):Promise<DoctorRequest>
}