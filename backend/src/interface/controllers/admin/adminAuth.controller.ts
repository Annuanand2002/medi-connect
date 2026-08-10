import { ILoginAdminUseCase } from "../../../application/repository/admin/ILoginAdminUsecase";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import {
  clearRefershTokenCookie,
  setRefershCookie,
} from "../../../shared/utils/cookies";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { IRefreshAdminUseCase } from "../../../application/repository/admin/IRefreshAdminUseCase";
import { ILogoutUseCase } from "../../../application/repository/common/ILogoutUseCase";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";

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
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Login succesfull", result });
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
      .json({ success: true, message: "Logout succesfully" });
  });
}
