export default interface DoctorVerificationToken {
  id?: string;
  doctorId: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}
