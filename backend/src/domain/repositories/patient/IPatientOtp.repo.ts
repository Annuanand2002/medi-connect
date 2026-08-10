import { PatientOtp } from "../../entities/patient/patientOtp.entity";

export interface IPatientOtpRepo {
  create(data: PatientOtp): Promise<PatientOtp>;
  findByPatientId(patientId: string): Promise<PatientOtp | null>;
  deleteByPatientId(patientId: string): Promise<void>;
  update(patientId: string, data: Partial<PatientOtp>): Promise<PatientOtp | null>;
}
