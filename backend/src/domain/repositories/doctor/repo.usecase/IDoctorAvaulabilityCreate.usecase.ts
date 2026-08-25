import { CreateDoctorAvailabilityDTO } from "../../../../application/DTO/doctor/doctorAvailbilty";
import { DoctorAvailability } from "../../../entities/doctor/doctorAvailability";

export interface ICreateDoctorAvailUseCase{
    exceute(doctorId:string,dto :CreateDoctorAvailabilityDTO):Promise<DoctorAvailability[]>
}