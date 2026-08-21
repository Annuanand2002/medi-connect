import { injectable, inject } from "inversify";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";
import { IGetDoctorRetryRequest } from "../../../domain/repositories/doctor/repo.usecase/IGetDoctorRetryReq.usecase";

@injectable()
export class GetRetryDoctorRequestController {
  constructor(
    @inject(TYPES.GetDoctorRetryRequest)
    private _getRetryDoctorRequest: IGetDoctorRetryRequest,
  ) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const token = req.query.token as string;
    const doctorRequest = await this._getRetryDoctorRequest.execute(token);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Request fetcehd succesfully",
      result: doctorRequest,
    });
  });
}
