export interface DcotorAppointmentDetails {
  patientId: string;
  patientCode: string;
  patienttName: string;
  gender: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface GetDcotorAppointmentConfrimDetailsDTO {  
  date: Date;
  startTime: string;
  endTime: string;
}