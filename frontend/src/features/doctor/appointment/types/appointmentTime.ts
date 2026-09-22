
export interface DoctorAvailableTimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface DoctorRequestDate {
  startDate: Date;
  endDate: Date;
}

export interface DoctorAvailableDate {
  date: Date;
}

export interface DoctorGetTimeSlotRequest {
  date: string;
}

export interface DoctorGetTimeSlotResponse {
  success: boolean;
  message: string;
  data: DoctorAvailableTimeSlot[];
}
export interface AppointmentDoctorTimeState {
  timeSlots: DoctorAvailableTimeSlot[];
  selectedStartTime: string | null;
  selectedEndTime: string | null;
  isLoading: boolean;
  error: string | null;
}