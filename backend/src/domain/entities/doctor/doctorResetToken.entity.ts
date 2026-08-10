export interface DoctorResetToken {
  id?: string;
  doctorId: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}
