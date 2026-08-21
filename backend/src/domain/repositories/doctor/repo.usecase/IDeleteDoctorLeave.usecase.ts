import { DoctorLeave } from "../../../entities/doctor/doctorLeave";

export interface IDeleteDoctorLeaveUsecase {
  execute(id: string): Promise<DoctorLeave | null>;
}
