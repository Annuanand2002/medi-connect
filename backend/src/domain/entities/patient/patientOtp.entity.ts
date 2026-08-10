export interface PatientOtp {
  id?: string;
  patientId: string;
  otp: string;
  expiresAt: Date;
  lastSentAt: Date;
  resendCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
