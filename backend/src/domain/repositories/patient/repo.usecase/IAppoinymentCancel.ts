import { AppointmentDet } from "../../../../application/DTO/patient/appointment";

export interface IAppointmentCancel{
    execute(id:string):Promise<AppointmentDet>
}