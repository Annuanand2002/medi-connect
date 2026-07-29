import { Response } from "express";
import env from "../config/env";

export const setRefershCookie = (res: Response, refreshToken: string): void => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: env.REFRESH_TOKEN_COOKIE_MAX_AGE,
  });
};
export const clearRefershTokenCookie = (res: Response): void => {
  res.clearCookie("refreshToken");
};
