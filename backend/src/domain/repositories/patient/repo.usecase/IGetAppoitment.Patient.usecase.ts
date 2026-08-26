import {
  GetAppointmentReqDTO,
  PaginationAppointmenttResDTO,
} from "../../../../application/DTO/patient/getAppointmentRepo";

export interface IGetPatientAppointment {
  execute(patientId : string,dto: GetAppointmentReqDTO): Promise<PaginationAppointmenttResDTO>;
}
