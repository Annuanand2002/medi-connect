import { Week } from "../../../shared/constants/week";


export interface DoctorAvailabilityDayDTO {
  dayOfWeek: Week;
  startTime: string;
  endTime: string;

  breaks: {
    startTime: string;
    endTime: string;
  }[];

  duration: number;
}

export interface CreateDoctorAvailabilityDTO {
  startDate: Date;
  endDate: Date;
  days: DoctorAvailabilityDayDTO[];
}

export interface UpdateDoctorAvailabilityDTO {
  dayOfWeek: Week;

  startTime: string;
  endTime: string;

  breaks: {
    startTime: string;
    endTime: string;
  }[];

  duration: number;

  startDate: Date;
  endDate: Date;
}