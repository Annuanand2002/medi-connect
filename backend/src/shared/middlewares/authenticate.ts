import { Request, Response, NextFunction } from "express";
import { JWTService } from "../../infrastructure/services/ITokenService.impl";
import AppError from "../errors/appErrors";
import HTTP_STATUS from "../constants/httpStatusCode";

export const authenticate =
  (
    tokenService: JWTService,
    ...allowedUserTypes: ("admin" | "doctor" | "patient")[]
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(
        new AppError("Access token is required", HTTP_STATUS.UNAUTHORIZED),
      );
    }

    const token = authHeader.substring(7);

    try {
      const payload = await tokenService.verifyAccessToken(token);

      if (!allowedUserTypes.includes(payload.userType)) {
        return next(new AppError("Forbidden", HTTP_STATUS.FORBIDDEN));
      }

      req.user = payload;

      next();
    } catch (error) {
      next(error);
    }
  };
