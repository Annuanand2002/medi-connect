import type { AppointmentStatus } from "@/features/patient/appointment/type/appointmentList";

export interface DoctorAppointment {
  id: string;
  appointmentCode: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  patientCode: string;
  email: string;
  gender: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorAppointmentResponse {
  requests: DoctorAppointment[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface GetDoctorAppointmentParams {
  page: number;
  limit: number;
  search?: string;
  date?: string;
}

export interface SingleAppointmentDetails {
  id : string
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
