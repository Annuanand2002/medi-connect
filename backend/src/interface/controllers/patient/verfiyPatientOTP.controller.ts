import { inject, injectable } from "inversify";
import { IVerifyPatientOTPUsecase } from "../../../application/repository/patient/IVerifyOTP.usecase";
import { TYPES } from "../../../di/types/types";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class VerifyPatientOTP {
  constructor(
    @inject(TYPES.VerifyPatientOTPUsecase)
    private _verifyOTP: IVerifyPatientOTPUsecase,
  ) {}

  verifyOTP = asyncHandler(async (req: Request, res: Response) => {
    const patientId = req.params.patientId as string;
    const { otp } = req.body;
    await this._verifyOTP.execute({ patientId, otp });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "email verified succesfully" });
  });
}
