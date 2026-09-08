import { inject, injectable } from "inversify";
import { IGetAllDoctorUseCase } from "../../../domain/repositories/doctor/repo.usecase/IGetAllDoctor";
import { TYPES } from "../../../di/types/types";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { DoctorStatus } from "../../../shared/constants/role.status";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";
import { IToggleDoctorStatus } from "../../../domain/repositories/doctor/repo.usecase/IToggleDoctorStatus";


@injectable()
export class DoctorController {
  constructor(
    @inject(TYPES.GetAllDoctorsUSeCase)
    private _getAllDoctor: IGetAllDoctorUseCase,
    @inject(TYPES.ToggelDoctorStatus)
    private _toggle: IToggleDoctorStatus,
  ) {}
  getAllDoctor = asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as DoctorStatus | undefined;
    const search = req.query.search as string | undefined;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await this._getAllDoctor.execute({
      page,
      limit,
      search,
      status,
    });
    return res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //block and unblock
  toggleStatus = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this._toggle.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });
}
