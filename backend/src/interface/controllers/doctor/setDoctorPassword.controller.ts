import { inject, injectable } from "inversify";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";
import { ISetPasswordUsecase } from "../../../domain/repositories/doctor/repo.usecase/ISetPasswordUsecase";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";

@injectable()
export class SetDoctorPasswordController {
  constructor(
    @inject(TYPES.SetPasswordUsecase)
    private _setPasswordUsecase: ISetPasswordUsecase,
  ) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;
    await this._setPasswordUsecase.execute({ token, password });
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.CREATED));
  });
}
