export interface DoctorRequestFormData {
  fullName: string;
  email: string;
  dateOfBirth: string;
  qualification: string;
  department: string;
  experience: number;

  profileImg: FileList;
  governmentId: FileList;
  medicalLicense: FileList;
  degreeCertificates: FileList;
}
export interface DoctorRequestResponse {
  success: boolean;
  message: string;
  data?: unknown;
}
