import { ICreateDepartmentUsecase } from "../../../application/useCases/department/ICreateDepartmentUsecase";
import { IDeleteDepartmentUseCase } from "../../../application/useCases/department/IDeleteDepartmentUseCase";
import { IGetDepartmentUseCase } from "../../../application/useCases/department/IGetDepartment";
import { IRestoreDepartmentUseCase } from "../../../application/useCases/department/IRestoreDepartment";
import { IUpdateDepartmentUseCase } from "../../../application/useCases/department/IUpdateDepartmentUseCase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";

export class DepartmentController {
  constructor(
    private createDepartmentUseCase: ICreateDepartmentUsecase,
    private getDepartmentUsecase: IGetDepartmentUseCase,
    private updateDepartmentUsecase: IUpdateDepartmentUseCase,
    private deleteDepartmentUsecase: IDeleteDepartmentUseCase,
    private restoreDepartmentUsecase: IRestoreDepartmentUseCase,
  ) {}
  createDepartment = asyncHandler(async (req: Request, res: Response) => {
    const departments = await this.createDepartmentUseCase.execute({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "department created succesfully",
      result:departments,
    });
  });
  getAllDepartment = asyncHandler(async (req: Request, res: Response) => {
    const departments = await this.getDepartmentUsecase.execute();
        console.log("depart",departments)
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Departments fetched succesfully",
      result:departments,
    });
  });
  updateDepartment = asyncHandler(async (req: Request, res: Response) => {
    const department = await this.updateDepartmentUsecase.execute({
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
    await this.deleteDepartmentUsecase.execute({ id: req.params.id as string });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "dpeartment deleted succesfully" });
  });
  restoreDepartment = asyncHandler(async (req: Request, res: Response) => {
    await this.restoreDepartmentUsecase.execute({
      id: req.params.id as string,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "dpeartment restored succesfully" });
  });
}
