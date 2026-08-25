export const Week  = {
    MON : "MONDAY",
    TUES : "TUESDAY",
    WED : "WEDNESDAY",
    THURS : "THURSDAY",
    FRI  : "FRIDAY",
    SAT : "SATURDAY",
    SUN : "SUNDAY"
}
export type Week = (typeof Week)[keyof typeof Week];


export interface DoctorAvailability {
  id: string;
  doctorId: string;

  dayOfWeek: Week;

  startTime: string;
  endTime: string;

  breaks: {
    startTime: string;
    endTime: string;
  }[];

  duration: number;

  isAvailable: boolean;
  isDeleted: boolean;

  startDate: string;
  endDate: string;

  createdAt: string;
  updatedAt: string;
}
export interface DoctorAvailResponse {
  success: boolean;
  message: string;
  data:  DoctorAvailability[];
}