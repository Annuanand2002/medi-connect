import { TokenPaylaod } from "../../domain/services/ITokenService";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPaylaod;
      files ?: Record<string>;
    }
  }
}
export {};
