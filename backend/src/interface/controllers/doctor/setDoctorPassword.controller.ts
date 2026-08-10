import { inject, injectable } from "inversify";
import { ISetPasswordUsecase } from "../../../application/repository/doctor/ISetPasswordUsecase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";

@injectable()
export class SetDoctorPasswordController {
  constructor(
    @inject(TYPES.SetPasswordUsecase)
    private _setPasswordUsecase: ISetPasswordUsecase,
  ) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;
    await this._setPasswordUsecase.execute({ token, password });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Password set succesfully" });
  });
}
