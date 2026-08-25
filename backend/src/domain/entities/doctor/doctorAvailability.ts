import { Week } from "../../../shared/constants/week";

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

  startDate: Date;
  endDate: Date;

  recurrenceRule: string;

  exceptions: {
    date: Date;
    startTime: string;
    endTime: string;
    breaks: {
      startTime: string;
      endTime: string;
    }[];
  }[];

  isAvailable: boolean;
  isDeleted: boolean;
}
