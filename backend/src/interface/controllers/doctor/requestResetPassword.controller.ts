import { inject, injectable } from "inversify";
import { IRequestForgetPassword } from "../../../application/repository/common/IRequestForgetPassword.usecase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";

@injectable()
export class RequestResetPasswordController {
  constructor(
    @inject(TYPES.RequestDoctorForgetPasswordUseCase)
    private _requestResetUSeCase: IRequestForgetPassword) {}
  requestReset = asyncHandler(async (req: Request, res: Response) => {
    const {email} = req.body
    await this._requestResetUSeCase.execute(email);
    res
      .status(HTTP_STATUS.OK)
      .json({
        success: true,
        message:
          "A reset link has been send to your email.Please check your email",
      });
  });
}
