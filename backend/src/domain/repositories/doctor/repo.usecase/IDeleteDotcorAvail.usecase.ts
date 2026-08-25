import { DoctorAvailability } from "../../../entities/doctor/doctorAvailability";

export interface IDeleteDoctorAvailUsecase {
  execute(doctorId:string,id: string): Promise<DoctorAvailability|null>;
}
