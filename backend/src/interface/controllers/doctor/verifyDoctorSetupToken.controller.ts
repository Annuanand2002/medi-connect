import { inject, injectable } from "inversify";
import { IVerifyDoctorSetupTokenUseCase } from "../../../application/repository/doctor/IVerifyDoctorSetupTokenUseCase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";

@injectable()
export class VerifyDoctorSetupTokenController {
  constructor(
    @inject(TYPES.VerifyDoctorSetupTokenUseCase)
    private _verifyDoctorUsecse: IVerifyDoctorSetupTokenUseCase,
  ) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    const doctor = await this._verifyDoctorUsecse.execute({
      token: token as string,
    });
    res.status(HTTP_STATUS.OK).json({ success: true, doctor });
  });
}
