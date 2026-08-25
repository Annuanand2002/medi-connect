import { CreateDoctorLeaveDTO } from "../../../../application/DTO/doctor/doctorLeave.DTO";
import { DoctorLeave } from "../../../entities/doctor/doctorLeave";

export interface IUpdateDoctorLeaveUseCase {
  execute(id: string, dto: CreateDoctorLeaveDTO): Promise<DoctorLeave|null>;
}
