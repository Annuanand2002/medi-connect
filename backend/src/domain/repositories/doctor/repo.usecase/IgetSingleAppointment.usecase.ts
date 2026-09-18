import { SingleAppointmentDetails } from "../../../../application/DTO/doctor/appointment";

export interface ISingleAppointmentDetails {
    execute(id:string):Promise<SingleAppointmentDetails>
}