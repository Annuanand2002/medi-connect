import { Week } from "../../../shared/constants/week";

export interface CreateDoctorAvailabilityDTO {
  doctorId: string;
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