import { DoctorAvailability } from "../../../entities/doctor/doctorAvailability";

export interface IDeleteDoctorAvailUsecase {
  execute(id: string): Promise<DoctorAvailability|null>;
}
