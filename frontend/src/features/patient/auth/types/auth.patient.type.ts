export interface Patient {
  id: string;
  email: string;
  fullName: string;
}

export interface LoginPatientResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    patient: Patient;
  };
}
