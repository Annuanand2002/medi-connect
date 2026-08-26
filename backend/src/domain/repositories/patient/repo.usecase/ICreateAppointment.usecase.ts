import { GetAppointmentDetailsDTO } from "../../../../application/DTO/patient/appointment";
import { Appointment } from "../../../entities/patient/appointnent/appointment.entity";

export interface ICreateAppointmentUseCase {
    execute(patientId : string,dto:GetAppointmentDetailsDTO):Promise<Appointment>
}

