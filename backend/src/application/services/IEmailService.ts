export interface DoctorSetupEmailData {
  name: string;
  email: string;
  token: string;
}

export interface DoctorRejectEmailDate {
  email: string;
  name: string;
  rejectReason: string;
  canRetry: boolean;
  retryLink?: string;
}
export interface DoctorResetEmailData {
  name: string;
  email: string;
  token: string;
}

export interface PatientOTPEmailData {
  name: string;
  email: string;
  otp: string;
}
export default interface IEmailService {
  sendDoctorSetupEmail(data: DoctorSetupEmailData): Promise<void>;
  sendDoctorRejectionemail(data: DoctorRejectEmailDate): Promise<void>;
  sendDoctorResetEmail(data: DoctorResetEmailData): Promise<void>;
  sendPatientOtp(data: PatientOTPEmailData): Promise<void>;
  sendPatientResetEmail(data:DoctorResetEmailData):Promise<void>
}
