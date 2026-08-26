export interface PatientRequestDate {
  doctorId: string;
  startDate: string;
  endDate: string;
}

export interface Dates {
  date: string;
}

export interface GetDatesResponse {
  success: boolean;
  message: string;
  data: Dates[];
}

export interface AppointmentDateState {
  dates: Dates[];
  isLoading: boolean;
  error: string | null;
  startDate: string | null;
  endDate: string | null;
}