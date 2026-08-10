import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IResetPasswordUsecase } from "../../../application/repository/common/IResetPassword.usecase";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request,Response } from "express";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class ResetPatientPasswordController {
  constructor(
    @inject(TYPES.ResetPatientPassowrd)
    private _resetPassword: IResetPasswordUsecase,
  ) {}
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { password, token } = req.body;
    await this._resetPassword.execute({ password, token });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "password updated succesfully." });
  });
}