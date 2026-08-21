import { createDoctorLeaveDTO } from "../../../../application/DTO/doctor/doctorLeave.DTO";
import { DoctorLeave } from "../../../entities/doctor/doctorLeave";

export interface IUpdateDoctorLeaveUseCase {
  execute(id: string, dto: createDoctorLeaveDTO): Promise<DoctorLeave|null>;
}
