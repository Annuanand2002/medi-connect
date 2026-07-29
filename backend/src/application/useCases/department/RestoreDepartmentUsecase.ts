import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { DeleteDepartmentDTO } from "../../DTO/department/deleteDepartmentDTO";
import { IRestoreDepartmentUseCase } from "./IRestoreDepartment";

export class RestoreDepaertment implements IRestoreDepartmentUseCase {
  constructor(private departmentRepo: IDepartmentRepo) {}
  async execute(request: DeleteDepartmentDTO): Promise<void> {
    const department = await this.departmentRepo.findById(request.id);
    if (!department) {
      throw new AppError("Department not found", HTTP_STATUS.NOT_FOUND);
    }
    const updateDepartment = await this.departmentRepo.update(request.id, {
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
