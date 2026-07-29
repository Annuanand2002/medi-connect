export interface DoctorRequestDetails {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  qualification: string;
  specialization: string;
  experience: number;
  profileImg: string;
  governmentId: string;
  medicalLicense: string;
  degreeCertificates: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface DoctorRequestDetailsResponse {
  success: boolean;
  message: string;
  result: DoctorRequestDetails;
}