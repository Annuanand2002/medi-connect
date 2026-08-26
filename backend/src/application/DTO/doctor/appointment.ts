import { Appointment } from "../../../domain/entities/patient/appointnent/appointment.entity";

export interface PaginationDoctorAppointmenttResDTO {
  requests: Appointment[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetDoctorAppointmentReqDTO {
  page: number;
  limit: number;
  date?: Date;
  search?: string;
}
