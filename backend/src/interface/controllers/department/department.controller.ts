import { inject, injectable } from "inversify";
import { ICreateDepartmentUsecase } from "../../../application/repository/department/ICreateDepartmentUsecase";
import { IDeleteDepartmentUseCase } from "../../../application/repository/department/IDeleteDepartmentUseCase";
import { IGetDepartmentUseCase } from "../../../application/repository/department/IGetDepartment";
import { IRestoreDepartmentUseCase } from "../../../application/repository/department/IRestoreDepartment";
import { IUpdateDepartmentUseCase } from "../../../application/repository/department/IUpdateDepartmentUseCase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";

@injectable()
export class DepartmentController {
  constructor(
    @inject(TYPES.CreateDepeartmentUseCase)
    private _createDepartmentUseCase: ICreateDepartmentUsecase,
    @inject(TYPES.GetDepartmentUsecase)
    private _getDepartmentUsecase: IGetDepartmentUseCase,
    @inject(TYPES.UpdateDepartmentUseCase)
    private _updateDepartmentUsecase: IUpdateDepartmentUseCase,
    @inject(TYPES.DeleteDepartmentUseCase)
    private _deleteDepartmentUsecase: IDeleteDepartmentUseCase,
    @inject(TYPES.RestoreDepaertment)
    private _restoreDepartmentUsecase: IRestoreDepartmentUseCase,
  ) {}
  createDepartment = asyncHandler(async (req: Request, res: Response) => {
    const departments = await this._createDepartmentUseCase.execute({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "department created succesfully",
      result: departments,
    });
  });
  getAllDepartment = asyncHandler(async (req: Request, res: Response) => {
    const departments = await this._getDepartmentUsecase.execute();
    console.log("depart", departments);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Departments fetched succesfully",
      result: departments,
    });
  });
  updateDepartment = asyncHandler(async (req: Request, res: Response) => {
    const department = await this._updateDepartmentUsecase.execute({
      id: req.params.id as string,
      name: req.body.name,
      description: req.body.description,
    });
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "dpeartment updated sucessfully",
      department,
    });
  });
  deleteDepartment = asyncHandler(async (req: Request, res: Response) => {
    await this._deleteDepartmentUsecase.execute({
      id: req.params.id as string,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "dpeartment deleted succesfully" });
  });
  restoreDepartment = asyncHandler(async (req: Request, res: Response) => {
    await this._restoreDepartmentUsecase.execute({
      id: req.params.id as string,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "dpeartment restored succesfully" });
  });
}
