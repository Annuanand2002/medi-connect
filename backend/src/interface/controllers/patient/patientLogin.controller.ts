import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IPatientLoginUseCase } from "../../../application/repository/patient/IPatientLogin";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { setRefershCookie } from "../../../shared/utils/cookies";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class LoginPatientController {
  constructor(
    @inject(TYPES.LoginPatientUseCase)
    private _patientUseCase: IPatientLoginUseCase,
  ) {}
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._patientUseCase.execute(req.body);
    setRefershCookie(res, result.refreshToken);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Login successfull", result });
  });
}
