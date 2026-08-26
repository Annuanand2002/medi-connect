export interface AvailableTimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface PatientRequestDate {
  doctorId: string;
  startDate: Date;
  endDate: Date;
}

export interface Dates {
  date: Date;
}

export interface GetAppointmentDetailsDTO {
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export interface AppointmentDetails {
  doctorId: string;
  doctorCode: string;
  doctorName: string;
  department: string;
  date: Date;
  startTime: string;
  endTime: string;
}
