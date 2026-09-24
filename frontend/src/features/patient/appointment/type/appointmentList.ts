export type AppointmentStatus = "BOOKED" | "CANCELLED" | "RESCHEDULED"|"COMPLETED";

export interface PatientAppointment {
  id: string;
  appointmentCode: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  doctorCode: string;
  department: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PatientAppointmentResponse {
  requests: PatientAppointment[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface GetPatientAppointmentParams {
  page: number;
  limit: number;
  search?: string;
  status?: AppointmentStatus;
}
