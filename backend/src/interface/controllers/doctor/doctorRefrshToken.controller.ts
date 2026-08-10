import { inject, injectable } from "inversify";
import { IRefreshDoctorUseCase } from "../../../application/repository/doctor/IDoctorRefresh.usecase";
import { TYPES } from "../../../di/types/types";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { setRefershCookie } from "../../../shared/utils/cookies";

@injectable()
export class DoctorRefreshTokenController {
  constructor(
    @inject(TYPES.RefreshDoctorUseCase)
    private _doctorRefreshUsecase: IRefreshDoctorUseCase,
  ) {}
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Token is required", HTTP_STATUS.UNAUTHORIZED);
    }
    const result = await this._doctorRefreshUsecase.execute({
      refreshToken,
    });
    setRefershCookie(res, result.refreshToken);
    const { refreshToken: _, ...response } = result;
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Token refreshed succesfully",
      result: response,
    });
  });
}
