export type DoctorStatus =
  | "BLOCKED"
  | "ACTIVE"

export  interface Doctor {
  id: string;
  doctorCode: string;
  fullName: string;
  email: string;
  qualification: string;
  department: string;
  experience: number;
  status:  DoctorStatus;
  createdAt: string;
}
export interface DoctorListResponse {
  success: boolean;
  message: string;
  data: {
    requests: Doctor[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DoctorPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}