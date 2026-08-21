export type DoctorRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface DoctorRequest {
  id: string;
  fullName: string;
  email: string;
  department: string;
  experience: number;
  createdAt: string;
  status: DoctorRequestStatus;
}

export interface DoctorRequestPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DoctorRequestListResponse {
  success: boolean;
  message: string;
  data: {
    requests: DoctorRequest[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}