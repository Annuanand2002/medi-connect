import { PatientResetToken } from "../../entities/patient/patientResetToken.entity";

export interface IPatientResetTokenRepo {
  create(data: PatientResetToken): Promise<void>;
  findByPatientId(patientId: string): Promise<PatientResetToken | null>;
  findByToken(token: string): Promise<PatientResetToken | null>;
  deleteByToken(token: string): Promise<void>;
  deleteByPatientId(patientId: string): Promise<void>;
}
