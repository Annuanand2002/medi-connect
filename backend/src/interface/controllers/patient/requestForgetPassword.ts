import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IRequestForgetPassword } from "../../../domain/repositories/common/IRequestForgetPassword.usecase";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class RequestPatientResetPasswordController {
  constructor(
    @inject(TYPES.RequestPatientForgetPasswordUseCase)
    private _requestResetUSeCase: IRequestForgetPassword,
  ) {}
  requestReset = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await this._requestResetUSeCase.execute(email);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message:
        "A reset link has been send to your email.Please check your email",
    });
  });
}
