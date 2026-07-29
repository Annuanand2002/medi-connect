export interface DoctorRetryToken {
  id?: string;
  doctorRequestId: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}