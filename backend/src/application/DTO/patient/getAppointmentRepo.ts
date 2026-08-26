import { Appointment } from "../../../domain/entities/patient/appointnent/appointment.entity";
import { AppointmentStatus } from "../../../shared/constants/appointmentEnum";

export interface PaginationAppointmenttResDTO {
  requests: Appointment[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAppointmentReqDTO {
  page: number;
  limit: number;
  status?: AppointmentStatus;
  search?: string;
}
