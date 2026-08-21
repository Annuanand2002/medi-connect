import { DoctorAvailability } from "../../../entities/doctor/doctorAvailability";

export interface IGetDoctorAvailUsecase {
  execute(doctorId: string): Promise<DoctorAvailability[]>;
}
