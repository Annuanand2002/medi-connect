export interface VerifyDoctorSetupTokenDTO {
  token: string;
}

export interface VerifyDoctorSetupTokenResponseDTO {
  doctorId: string;
  fullName: string;
  email: string;
}
