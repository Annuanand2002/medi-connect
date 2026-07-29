export interface LoginResposneDTO {
  accessToken: string;
  refreshToken: string;
  admin: {
    id: string;
    email: string;
  };
}
