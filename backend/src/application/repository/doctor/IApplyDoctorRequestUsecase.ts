import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { ApplyDoctorRequestDTO } from "../../DTO/doctorRequet/applyDoctorRequestDTO";



export interface IDcotorRequestUseCase{
    execute(request:ApplyDoctorRequestDTO):Promise<DoctorRequest>
}