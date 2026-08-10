export interface Patient {
  id: string;
  email: string;
  fullName: string;
}

export interface LoginPatientResponse {
  success: boolean;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
    patient: Patient;
  };
}
