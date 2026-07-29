import { ISetPasswordUsecase } from "../../../application/useCases/doctor/auth/ISetPasswordUsecase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";

export class SetDoctorPasswordController {
  constructor(private setPasswordUsecase: ISetPasswordUsecase) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;
    await this.setPasswordUsecase.execute({ token, password });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Password set succesfully" });
  });
}
