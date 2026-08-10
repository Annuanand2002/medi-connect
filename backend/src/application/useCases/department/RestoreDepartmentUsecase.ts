import { inject, injectable } from "inversify";
import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { DeleteDepartmentDTO } from "../../DTO/department/deleteDepartmentDTO";
import { IRestoreDepartmentUseCase } from "../../repository/department/IRestoreDepartment";
import { TYPES } from "../../../di/types/types";

@injectable()
export class RestoreDepaertment implements IRestoreDepartmentUseCase {
  constructor(
    @inject(TYPES.DepartmentRepo)
    private _departmentRepo: IDepartmentRepo,
  ) {}
  async execute(request: DeleteDepartmentDTO): Promise<void> {
    const department = await this._departmentRepo.findById(request.id);
    if (!department) {
      throw new AppError("Department not found", HTTP_STATUS.NOT_FOUND);
    }
    const updateDepartment = await this._departmentRepo.update(request.id, {
      isActive: true,
    });
    if (!updateDepartment) {
      throw new AppError(
        "Failed to restore depaertmnet",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }

    return;
  }
}
