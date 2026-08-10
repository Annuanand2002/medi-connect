export interface PatientResetToken {
  id?: string;
  patientId: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}
