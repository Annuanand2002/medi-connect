export interface CreatePatientDTO {
  fullName: string;
  email: string;
  dateOfBirth: Date;
  gender: "Male" | "Female";
  password: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  weight: number;
  height: number;
}
export interface CreatePatienResponsetDTO{
    patientId : string;
    email : string
}