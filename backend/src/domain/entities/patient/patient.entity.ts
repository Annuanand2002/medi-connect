export interface PatientFile {
  url: string;
  publicId: string;
}

export interface Patient {
  id?: string;
  patientCode: string;
  fullName: string;
  email: string;
  dateOfBirth: Date;
  gender: "Male" | "Female";
  password: string;
  isVerified: boolean;
  profileImg?: PatientFile;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  weight: number;
  height: number;
  refreshToken?: string;
  isBlocked: "ACTIVE" | "BLOCKED";
  createdAt?: Date;
  updatedAt?: Date;
}
