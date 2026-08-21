export interface RetryDoctorRequest {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  qualification: string;
  department: string;
  experience: number;
  profileImg: string;
  governmentId: string;
  medicalLicense: string;
  degreeCertificates: string[];
}