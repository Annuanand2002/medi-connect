import { inject, injectable } from "inversify";
import asyncHandler from "../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../di/types/types";
import { ILoginAdminUseCase } from "../../domain/repositories/admin/ILoginAdminUsecase";
import { IRefreshAdminUseCase } from "../../domain/repositories/admin/IRefreshAdminUseCase";
import { ILogoutUseCase } from "../../domain/repositories/common/ILogoutUseCase";
import {
  clearRefershTokenCookie,
  setRefershCookie,
} from "../../shared/utils/cookies";
import sendResponse from "../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../shared/constants/message";
import HTTP_STATUS from "../../shared/constants/httpStatusCode";
import AppError from "../../shared/errors/appErrors";

@injectable()
export class AdminController {
  constructor(
    @inject(TYPES.AdminUseCase)
    private readonly _adminLoginUseCase: ILoginAdminUseCase,
    @inject(TYPES.RefreshAdminUseCase)
    private readonly _adminRefreshTokenUseCase: IRefreshAdminUseCase,
    @inject(TYPES.LogoutUseCase)
    private readonly _adminLogoutUseCase: ILogoutUseCase,
  ) {}

  //login
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._adminLoginUseCase.execute(req.body);
    setRefershCookie(res, result.refreshToken);
    sendResponse(`${RESPONSE_MESSAGES.LOGIN_SUCCESS}`, result);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.LOGIN_SUCCESS, result));
  });

  //logout
  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("token is required", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._adminLogoutUseCase.execute({ refreshToken });
    clearRefershTokenCookie(res);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.LOGIN_SUCCESS));
  });

  //refreshtoken
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Token is required", HTTP_STATUS.UNAUTHORIZED);
    }
    const result = await this._adminRefreshTokenUseCase.execute({
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
