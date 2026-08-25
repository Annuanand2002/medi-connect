import {
  ITokenService,
  TokenPair,
  TokenPaylaod,
} from "../../domain/services/ITokenService";
import jwt from "jsonwebtoken";
import env from "../../shared/config/env";
import { injectable } from "inversify";

@injectable()
export class JWTService implements ITokenService {
  async generateTokens(paylaod: TokenPaylaod): Promise<TokenPair> {
    const accessToken = jwt.sign(paylaod, env.ACCESS_TOKEN_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(paylaod, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async verifyAccessToken(token: string): Promise<TokenPaylaod> {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as TokenPaylaod;
  }
  async verifyRefreshToken(token: string): Promise<TokenPaylaod> {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as TokenPaylaod;
  }
}
