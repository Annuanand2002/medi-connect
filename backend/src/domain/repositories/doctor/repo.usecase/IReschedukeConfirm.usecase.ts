import { DoctorAppointmentDet, DoctorGetAppointmentDetailsDTO} from "../../../../application/DTO/doctor/appointment";

export interface IGetRescheduleDetailsUseCase {
  execute(dto: DoctorGetAppointmentDetailsDTO): Promise<DoctorAppointmentDet>;
}
