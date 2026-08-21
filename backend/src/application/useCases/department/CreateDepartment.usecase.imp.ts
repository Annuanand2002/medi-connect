import { inject, injectable } from "inversify";
import { Department } from "../../../domain/entities/department/department.entities";
import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { CreateDepatmentDTO } from "../../DTO/department/createDepaertmentDTO";
import { TYPES } from "../../../di/types/types";
import { ICreateDepartmentUsecase } from "../../../domain/repositories/department/ICreateDepartmentUsecase";

@injectable()
export class CreateDepeartmentUseCase implements ICreateDepartmentUsecase {
  constructor(
    @inject(TYPES.DepartmentRepo)
    private _departmentRepo: IDepartmentRepo,
  ) {}
  async execute(request: CreateDepatmentDTO): Promise<Department> {
    const name = request.name.trim();
    if (!name) {
      throw new AppError(
        "Department name is required",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const existingDepartment = await this._departmentRepo.findByName(name);
    if (existingDepartment) {
      throw new AppError(
        "Department name already exist.",
        HTTP_STATUS.CONFLICT,
      );
    }
    const lastDepartment = await this._departmentRepo.findlastDepartment();
    let departmentCode = "DEP001";
    if (lastDepartment?.departmentCode) {
      const lastNumber = Number(
        lastDepartment.departmentCode.replace("DEP", ""),
      );
      departmentCode = `DEP${String(lastNumber + 1).padStart(3, "0")}`;
    }
    return await this._departmentRepo.create({
      name,
      description: request.description?.trim(),
      departmentCode,
    });
  }
}
