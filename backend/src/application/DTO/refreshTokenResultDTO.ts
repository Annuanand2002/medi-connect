export interface RefreshTokenResultDTO {
  accessToken: string;
  refreshToken: string;
  admin : {
    id : string;
    email : string;
  }
}
