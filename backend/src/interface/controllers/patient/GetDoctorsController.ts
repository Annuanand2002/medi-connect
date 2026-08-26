import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IGetAllDoctorUseCase } from "../../../domain/repositories/doctor/repo.usecase/IGetAllDoctor";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { GetDoctorReqDTO } from "../../../application/DTO/doctor/getDoctorDTO";
import { DoctorStatus } from "../../../shared/constants/role.status";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import sendResponse from "../../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../../shared/constants/message";

@injectable()
export class GetDoctorsController {
  constructor(
    @inject(TYPES.GetAllDoctorsUSeCase)
    private _getDoctor: IGetAllDoctorUseCase,
  ) {}
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string | undefined;
    const department = req.query.department as string | undefined;
    const status = DoctorStatus.ACTIVE;
    const dto: GetDoctorReqDTO = {
      page,
      limit,
      search,
      status,
      department,
    };
    const reuslt = await this._getDoctor.execute(dto);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, reuslt));
  });
}
