export interface DoctorBlock {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  isDeleted: boolean;
}
export interface DoctorBlockListResponse {
  success: boolean;
  message: string;
  data: {
    requests: DoctorBlock[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DoctorBlockPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface CreateDoctorBlock {
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}
export interface CreateDoctorBlockResponse {
  success: boolean;
  message: string;
  data: DoctorBlock;
}
