export interface AddDoctorAvailabilityExceptionDTO {
  date: Date;
  startTime: string;
  endTime: string;
  breaks: {
    startTime: string;
    endTime: string;
  }[];
}