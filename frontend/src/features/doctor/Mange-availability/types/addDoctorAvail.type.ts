import type { DoctorAvailability } from "./doctorAvail.type";

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

export interface CreateDoctorAvailability {
  dayOfWeek: Week;
  startTime: string;
  endTime: string;
  breaks: {
    startTime: string;
    endTime: string;
  }[];
  isAvailable?: boolean;
  duration: number;
}

export interface CreateDoctorAvailResponse {
  success: boolean;
  message: string;
  data:  DoctorAvailability;
}