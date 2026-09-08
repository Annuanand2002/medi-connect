import { AppointmentDet } from "../../../../application/DTO/patient/appointment";

export interface IAppointmentDetails {
  execute(appointmentId: string): Promise<AppointmentDet>;
}
