export interface AppointmentDetails {
  doctorId: string;
  doctorCode: string;
  doctorName: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface GetAppointmentConfrimDetailsDTO {
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
}