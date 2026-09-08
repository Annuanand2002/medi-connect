import { inject, injectable } from "inversify";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { ICreatePatientUseCase } from "../../../domain/repositories/patient/repo.usecase/ICreatePatient.usecase";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";
import { IVerifyPatientOTPUsecase } from "../../../domain/repositories/patient/repo.usecase/IVerifyOTP.usecase";
import { IResentOTPUseCase } from "../../../domain/repositories/patient/repo.usecase/IResendOTP.usecase";

@injectable()
export class CreatePatientController {
  constructor(
    @inject(TYPES.CreatePatientUSeCase)
    private _patientUsecase: ICreatePatientUseCase,
    @inject(TYPES.VerifyPatientOTPUsecase)
    private _verifyOTP: IVerifyPatientOTPUsecase,
    @inject(TYPES.ResentOTPUsecase)
        private _rsendOTP: IResentOTPUseCase,
  ) {}
  //mail
  createPatient = asyncHandler(async (req: Request, res: Response) => {
    const patient = await this._patientUsecase.execute(req.body);
    const result = {
      patientId: patient.patientId,
      email: patient.email,
    };
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse("A otp has been send to your email", result));
  });

  //sendOTP
  verifyOTP = asyncHandler(async (req: Request, res: Response) => {
    const patientId = req.params.patientId as string;
    const { otp } = req.body;
    await this._verifyOTP.execute({ patientId, otp });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.EMAIL_VERIFIED));
  });

  //resendOTP
    resendOTP = asyncHandler(async (req: Request, res: Response) => {
    const patientId = req.params.patientId as string;
    await this._rsendOTP.execute(patientId);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse("OTP has been been resende to your email."));
  });
}
