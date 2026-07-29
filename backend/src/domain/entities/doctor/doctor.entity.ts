export interface UploadFile {
  url: string;
  publicId: string;
}

export default interface Doctor {
  id?: string;
  doctorCode?: string;
  fullName: string;
  email: string;
  password?: string;
  profileImg: UploadFile;
  qualification: string;
  specialization: string;
  experience: number;
  departmentId: string;
  refreshToken?: string;
  status: "PENDING_SETUP" | "ACTIVE" | "BLOCKED";
  createdAt?: Date;
  updatedAt?: Date;
}
