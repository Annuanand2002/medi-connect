export interface CreateAppointmentRequest {
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface CreatedAppointment {
  id: string;
  appointmentCode: string;
  doctorId: string;
  patientId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}