import type { AppointmentStatus } from "@/features/patient/appointment/type/appointmentList";

export interface SingleDoctorAppointmentDetails {
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
