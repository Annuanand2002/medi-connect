import { Appointment } from "../../../domain/entities/patient/appointnent/appointment.entity";
import { AppointmentStatus } from "../../../shared/constants/appointmentEnum";

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

export interface SingleAppointmentDetails {
  patientId: string;
  appointmentCode: string;
  patientName: string;
  gender: string;
  email: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
}
