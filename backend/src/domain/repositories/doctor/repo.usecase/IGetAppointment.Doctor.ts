import {
  GetDoctorAppointmentReqDTO,
  PaginationDoctorAppointmenttResDTO,
} from "../../../../application/DTO/doctor/appointment";

export interface IGetDoctorAppointment {
  execute(
    doctorId: string,
    dto: GetDoctorAppointmentReqDTO,
  ): Promise<PaginationDoctorAppointmenttResDTO>;
}
