import { ApplyDoctorRequestDTO } from "../../../../application/DTO/doctorRequet/applyDoctorRequestDTO";
import DoctorRequest from "../../../entities/doctor/doctorRequestEntity";




export interface IDcotorRequestUseCase{
    execute(request:ApplyDoctorRequestDTO):Promise<DoctorRequest>
}