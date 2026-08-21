import { createDoctorLeaveDTO } from "../../../../application/DTO/doctor/doctorLeave.DTO";
import { DoctorLeave } from "../../../entities/doctor/doctorLeave";

export interface ICreateDoctorLeaveUsecase {
    execute(dto:createDoctorLeaveDTO):Promise<DoctorLeave>
}