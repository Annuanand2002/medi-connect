import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import {
  clearRefershTokenCookie,
  setRefershCookie,
} from "../../../shared/utils/cookies";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IPatientLoginUseCase } from "../../../domain/repositories/patient/repo.usecase/IPatientLogin";
import { ILogoutUseCase } from "../../../domain/repositories/common/ILogoutUseCase";
import AppError from "../../../shared/errors/appErrors";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";

@injectable()
export class AuthPatientController {
  constructor(
    @inject(TYPES.LoginPatientUseCase)
    private _patientUseCase: IPatientLoginUseCase,
    @inject(TYPES.LogoutPatientUseCase)
    private _patientUsecase: ILogoutUseCase,
  ) {}
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._patientUseCase.execute(req.body);
    setRefershCookie(res, result.refreshToken);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.LOGIN_SUCCESS, result));
  });

  //logout
  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Token not found", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._patientUsecase.execute({ refreshToken });
    clearRefershTokenCookie(res);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.LOGOUT_SUCCESS));
  });
}
