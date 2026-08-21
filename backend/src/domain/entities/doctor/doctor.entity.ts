import { Department } from "../../../shared/constants/department";


export interface UploadFile {
  url: string;
  key: string;
}

export default interface Doctor {
  id?: string;
  doctorCode?: string;
  fullName: string;
  email: string;
  password?: string;
  profileImg: UploadFile;
  qualification: string;
  department: Department;
  experience: number;
  refreshToken?: string;
  status: "ACTIVE" | "BLOCKED";
  createdAt?: Date;
  updatedAt?: Date;
}
