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

export interface AvailableDate {
  date: Date;
}

export interface GetTimeSlotRequest {
  doctorId: string;
  date: string;
}

export interface GetTimeSlotResponse {
  success: boolean;
  message: string;
  data: AvailableTimeSlot[];
}
