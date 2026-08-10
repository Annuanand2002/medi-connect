export interface LoginPatientDTO {
  email: string;
  password: string;
}

export interface LoginPatientResponseDTO {
  accessToken: string;
  refreshToken: string;
  patient: {
    id: string;
    email: string;
    fullName: string;
  };
}
