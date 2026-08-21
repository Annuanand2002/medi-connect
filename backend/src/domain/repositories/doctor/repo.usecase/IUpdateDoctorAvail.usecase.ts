import { CreateDoctorAvailabilityDTO } from "../../../../application/DTO/doctor/doctorAvailbilty";
import { DoctorAvailability } from "../../../entities/doctor/doctorAvailability";

export interface IUpdateDoctorAvailabilityUseCase {
    execute(id:string,dto:CreateDoctorAvailabilityDTO):Promise<DoctorAvailability|null>
}