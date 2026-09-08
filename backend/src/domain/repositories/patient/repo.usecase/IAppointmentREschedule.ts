import { AppointmentDet, GetAppointmentRescheduleDetails } from "../../../../application/DTO/patient/appointment";

export interface IAppointmentReschedule{
    execute(id:string,dto:GetAppointmentRescheduleDetails):Promise<AppointmentDet>
}