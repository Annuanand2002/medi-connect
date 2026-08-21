export type PatientStatus =
  | "BLOCKED"
  | "ACTIVE"

 export type Gender = 
 | "MALE"
 | "FEMALE" 

export interface Patients {
  id: string;
  patientCode: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  isVerified: boolean;
  isBlocked: PatientStatus
  weight: number;
  height: number;
  gender: Gender;
  createdAt : Date;
}
export interface PatientListResponse {
  success: boolean;
  message: string;
  data: {
    requests: Patients[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PatientPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}