import { CreateDoctorLeaveDTO } from "../../../../application/DTO/doctor/doctorLeave.DTO";
import { DoctorLeave } from "../../../entities/doctor/doctorLeave";

export interface ICreateDoctorLeaveUsecase {
    execute(dto:CreateDoctorLeaveDTO):Promise<DoctorLeave>
}