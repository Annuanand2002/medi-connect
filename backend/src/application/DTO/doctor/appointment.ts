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

export interface DoctorGetAppointmentDetailsDTO {
  appointmentId: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export interface DoctorAppointmentDet {
  id: string
  patientId: string;
  patientCode ?: string;
  patientName: string;
  gender: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  appointmentCode: string;
}
