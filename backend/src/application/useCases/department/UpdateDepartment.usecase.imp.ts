import { inject, injectable } from "inversify";
import { Department } from "../../../domain/entities/department/department.entities";
import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { UpdateDepartmentDTO } from "../../DTO/department/updateDepartmentDTO";
import { IUpdateDepartmentUseCase } from "../../repository/department/IUpdateDepartmentUseCase";
import { TYPES } from "../../../di/types/types";

@injectable()
export class UpdateDepartmentUseCase implements IUpdateDepartmentUseCase {
  constructor(
    @inject(TYPES.DepartmentRepo)
    private _departmentRepo: IDepartmentRepo,
  ) {}
  async execute(request: UpdateDepartmentDTO): Promise<Department> {
    const name = request.name.trim();
    if (!name) {
      throw new AppError(
        "Department name is required",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const existingDepartment = await this._departmentRepo.findByName(name);
    if (existingDepartment) {
      throw new AppError("Department exist", HTTP_STATUS.CONFLICT);
    }
    const updateDepartment = await this._departmentRepo.update(request.id, {
      name,
      description: request.description,
    });
    if (!updateDepartment) {
      throw new AppError(
        "failed to update department",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
    return updateDepartment;
  }
}
