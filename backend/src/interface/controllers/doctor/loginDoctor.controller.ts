import { IDoctorLoginUseCase } from "../../../application/repository/doctor/IDoctorLogin.usecase";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { setRefershCookie } from "../../../shared/utils/cookies";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";

@injectable()
export class LoginDoctorController {
  constructor(
    @inject(TYPES.DoctorLoginUseCase)
    private _loginDoctorUsecase: IDoctorLoginUseCase,
  ) {}
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._loginDoctorUsecase.execute(req.body);
    setRefershCookie(res, result.refreshToken);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Doctor Login succesfully", result });
  });
}
