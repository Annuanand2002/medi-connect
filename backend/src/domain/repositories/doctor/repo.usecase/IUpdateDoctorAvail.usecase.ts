import { UpdateDoctorAvailabilityDTO } from "../../../../application/DTO/doctor/doctorAvailbilty";
import { DoctorAvailability } from "../../../entities/doctor/doctorAvailability";

export interface IUpdateDoctorAvailabilityUseCase {
    execute(id:string,dcotorId : string,dto:UpdateDoctorAvailabilityDTO):Promise<DoctorAvailability|null>
}