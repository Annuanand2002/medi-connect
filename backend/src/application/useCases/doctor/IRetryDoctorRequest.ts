import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { RetryDoctorRequestDTO } from "../../DTO/doctorRequet/retryDoctorRequest.update.DTO";

export interface IRetryDoctorRequestUseCase{
    execute(request:RetryDoctorRequestDTO):Promise<DoctorRequest>
}