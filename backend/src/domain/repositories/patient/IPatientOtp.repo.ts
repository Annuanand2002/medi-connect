import { PatientOtp } from "../../entities/patient/patientOtp.entity";
import { IBaseRepository } from "../base/IBaseRepository";

export interface IPatientOtpRepo extends IBaseRepository<PatientOtp> {
  findByPatientId(patientId: string): Promise<PatientOtp | null>;
  deleteByPatientId(patientId: string): Promise<void>;
}
