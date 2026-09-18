import { SingleAppointmentDetails } from "../../../../application/DTO/doctor/appointment";
import { GetAppointmentRescheduleDetails } from "../../../../application/DTO/patient/appointment";

export interface IAppointmentDoctorReschedule{
    execute(id:string,dto:GetAppointmentRescheduleDetails):Promise<SingleAppointmentDetails>
}