import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IResentOTPUseCase } from "../../../application/repository/patient/IResendOTP.usecase";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class ResendOTPController {
  constructor(
    @inject(TYPES.ResentOTPUsecase)
    private _rsendOTP: IResentOTPUseCase,
  ) {}
  resendOTP = asyncHandler(async (req: Request, res: Response) => {
    const patientId = req.params.patientId as string;
    await this._rsendOTP.execute(patientId);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "OTP has been resended to your mail" });
  });
}
