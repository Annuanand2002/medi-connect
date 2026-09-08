import { injectable, inject } from "inversify";
import { TYPES } from "../../../di/types/types";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IResetPasswordUsecase } from "../../../domain/repositories/common/IResetPassword.usecase";
import { IRequestForgetPassword } from "../../../domain/repositories/common/IRequestForgetPassword.usecase";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";

@injectable()
export class ResetDoctorPasswordController {
  constructor(
    @inject(TYPES.ResetDoctorPassowrd)
    private _resetPassword: IResetPasswordUsecase,
    @inject(TYPES.RequestDoctorForgetPasswordUseCase)
    private _requestResetUSeCase: IRequestForgetPassword,
  ) {}

  //requestPassword
  requestReset = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await this._requestResetUSeCase.execute(email);
    res
      .status(HTTP_STATUS.OK)
      .json(
        sendResponse(
          "A reset link has been send to your email.Please check your email",
        ),
      );
  });

  //resetPassword
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { password, token } = req.body;
    await this._resetPassword.execute({ password, token });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED));
  });
}
