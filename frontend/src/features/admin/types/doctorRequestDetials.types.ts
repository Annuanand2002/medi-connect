export interface UploadFile{
  url : string
  key : string
}

export interface DoctorRequestDetails {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  qualification: string;
  specialization: string;
  experience: number;
  profileImg: UploadFile;
  governmentId: UploadFile;
  medicalLicense: UploadFile;
  degreeCertificates: UploadFile[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface DoctorRequestDetailsResponse {
  success: boolean;
  message: string;
  result: DoctorRequestDetails;
}