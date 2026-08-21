import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IPatientRefreshUseCase } from "../../../domain/repositories/patient/repo.usecase/IPatientRefreshToken";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { setRefershCookie } from "../../../shared/utils/cookies";

@injectable()
export class RefreshPatientTokenController {
  constructor(
    @inject(TYPES.RefreshPatientToken)
    private _refreshTokenUseCase: IPatientRefreshUseCase,
  ) {}

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Token reqired", HTTP_STATUS.UNAUTHORIZED);
    }
    const result = await this._refreshTokenUseCase.execute({ refreshToken });
    setRefershCookie(res, refreshToken);
    const { refreshToken: _, ...response } = result;
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Token refreshed succesfully",
      result: response,
    });
  });
}
