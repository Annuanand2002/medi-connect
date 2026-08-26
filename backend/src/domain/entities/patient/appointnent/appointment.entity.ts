import { AppointmentStatus } from "../../../../shared/constants/appointmentEnum";

export interface Appointment {
  id: string;
  appointmentCode: string;
  doctorId: string;
  patientId: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  createdAt : Date;
  updatedAt : Date;
}
