import { injectable, inject } from "inversify";
import { TYPES } from "../../../di/types/types";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IResetPasswordUsecase } from "../../../domain/repositories/common/IResetPassword.usecase";

@injectable()
export class ResetDoctorPasswordController {
  constructor(
    @inject(TYPES.ResetDoctorPassowrd)
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
