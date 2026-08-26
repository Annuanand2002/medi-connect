export interface GetDoctorsParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
}

export interface Doctor {
  id: string;
  doctorCode: string;
  fullName: string;
  email: string;
  department: string;
  experience : number
  status: string;
}

export interface GetDoctorsResponse {
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