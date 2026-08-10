export interface VerifyPatientOtpRequest {
  patientId: string;
  otp: string;
}
export interface VerifyPatientOtpResponse {
  success: boolean;
  message: string;
}