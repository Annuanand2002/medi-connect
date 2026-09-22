export interface DoctorRequestDate {
  startDate: string;
  endDate: string;
}

export interface Dates {
  date: string;
}

export interface GetDoctorDatesResponse {
  success: boolean;
  message: string;
  data: Dates[];
}

export interface AppointmentDoctorDateState {
  dates: Dates[];
  isLoading: boolean;
  error: string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface DoctorRescheduleDateParams {
  appointmentId: string;
  startDate: string;
  endDate: string;
}