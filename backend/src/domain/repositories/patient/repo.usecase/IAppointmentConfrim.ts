import {
  AppointmentDetails,
  GetAppointmentDetailsDTO,
} from "../../../../application/DTO/patient/appointment";

export interface IGetAppointmentDetailsUseCase {
  execute(dto: GetAppointmentDetailsDTO): Promise<AppointmentDetails>;
}
