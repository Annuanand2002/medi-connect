import type { DoctorAvailability, Week } from "./doctorAvail.type";


export interface DoctorAvailabilityDay {
  dayOfWeek: Week;

  startTime: string;
  endTime: string;

  breaks: {
    startTime: string;
    endTime: string;
  }[];

  duration: number;
}

export interface CreateDoctorAvailability {
  startDate: string;
  endDate: string;
  days: DoctorAvailabilityDay[];
}

export interface CreateDoctorAvailResponse {
  success: boolean;
  message: string;
  data: DoctorAvailability[];
}

export interface UpdateDoctorAvailability {
  dayOfWeek: Week;

  startTime: string;
  endTime: string;

  breaks: {
    startTime: string;
    endTime: string;
  }[];

  duration: number;

  startDate: string;
  endDate: string;
}


export interface UpdateDoctorAvailResponse {
  success: boolean;
  message: string;
  data: DoctorAvailability;
}