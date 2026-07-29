export interface TokenPaylaod {
  id: string;
  userType: "admin" | "doctor" | "patient";
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
export interface ITokenService {
  generateTokens(paylaod: TokenPaylaod): Promise<TokenPair>;
  verifyAccessToken(token: string): Promise<TokenPaylaod>;
  verifyRefreshToken(token: string): Promise<TokenPaylaod>;
}
