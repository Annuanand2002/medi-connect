export interface DoctorLeave {
  id: string;
  doctorId: string;
  startDate: string;
  endDate: string;
  reason: string;
  isDeleted: boolean;
}
export interface DoctorLeaveListResponse {
  success: boolean;
  message: string;
  data: {
    requests: DoctorLeave[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DoctorLeavePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface CreateDoctorLeave {
  startDate: string;
  endDate: string;
  reason: string;
}
export interface CreateDoctorLeaveResponse {
  success: boolean;
  message: string;
  data: DoctorLeave;
}

