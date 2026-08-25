import { DoctorLeave } from "../../../entities/doctor/doctorLeave";

export interface IDeleteDoctorLeaveUsecase {
  execute(doctorId : string,id: string): Promise<DoctorLeave | null>;
}
