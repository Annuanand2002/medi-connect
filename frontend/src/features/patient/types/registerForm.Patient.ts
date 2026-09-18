export interface PatientRegistrationRequest {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  password: string;
  bloodGroup:
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-";
  weight: number;
  height: number;
}
export interface PatientRegistrationResult {
  patientId: string;
  email: string;
}
export interface PatientRegistrationResponse {
  success: boolean;
  message: string;
  data: PatientRegistrationResult;
}