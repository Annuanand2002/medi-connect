import type { AppointmentStatus } from "./appointmentList";

export interface AppointmentSinglePage {
  id: string;
  doctorId: string;
  doctorCode: string;
  doctorName: string;
  department: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  appointmentCode: string;
}

export interface ReschudelRequest{
    date : Date;
    startTime : string;
    endTime : string
}