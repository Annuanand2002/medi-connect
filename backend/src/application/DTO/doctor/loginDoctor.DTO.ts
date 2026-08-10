export interface DoctorLoginResDTO{
    accessToken: string;
  refreshToken: string;
  doctor : {
    id : string;
    email : string;
    fullName : string;
    profileImg : string; 
  }
}
