import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { clearRefershTokenCookie } from "../../../shared/utils/cookies";
import { ILogoutUseCase } from "../../../domain/repositories/common/ILogoutUseCase";

@injectable()
export class PatientLogoutController {
  constructor(
    @inject(TYPES.LogoutPatientUseCase)
    private _patientUsecase: ILogoutUseCase,
  ) {}
  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Token not found", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._patientUsecase.execute({ refreshToken });
    clearRefershTokenCookie(res);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Logout succesfully" });
  });
}
