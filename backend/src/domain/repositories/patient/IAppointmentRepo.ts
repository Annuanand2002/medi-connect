import {
  GetDoctorAppointmentReqDTO,
  PaginationDoctorAppointmenttResDTO,
} from "../../../application/DTO/doctor/appointment";
import { AppointmentDet } from "../../../application/DTO/patient/appointment";
import {
  GetAppointmentReqDTO,
  PaginationAppointmenttResDTO,
} from "../../../application/DTO/patient/getAppointmentRepo";
import { Appointment } from "../../entities/patient/appointnent/appointment.entity";
import { IBaseRepository } from "../base/IBaseRepository";

export interface IAppointmentRepo extends IBaseRepository<Appointment> {
  findPatientAppointment(
    patientId: string,
    dto: GetAppointmentReqDTO,
  ): Promise<PaginationAppointmenttResDTO>;
  findDoctorAppointment(
    doctorId: string,
    dto: GetDoctorAppointmentReqDTO,
  ): Promise<PaginationDoctorAppointmenttResDTO>;

  findExistingAppointment(
    doctorId: string,
    date: Date,
    startTime: string,
    endTime: string,
  ): Promise<Appointment | null>;

  findAppointmentsByDoctorAndDate(
    doctorId: string,
    date: Date,
  ): Promise<Appointment[]>;
  
}
