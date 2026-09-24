export interface Review {
  id: string;
  doctorId: string;
  patientId: string;
  appointmentId: string;
  reviewCode: string;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted : boolean
}
