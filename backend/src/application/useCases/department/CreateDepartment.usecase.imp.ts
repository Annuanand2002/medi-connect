import { Department } from "../../../domain/entities/department/department.entities";
import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { CreateDepatmentDTO } from "../../DTO/department/createDepaertmentDTO";
import { ICreateDepartmentUsecase } from "../../repository/department/ICreateDepartmentUsecase";

export class CreateDepeartmentUseCase implements ICreateDepartmentUsecase {
  constructor(private departmentRepo: IDepartmentRepo) {}
  async execute(request: CreateDepatmentDTO): Promise<Department> {
    const name = request.name.trim();
    if (!name) {
      throw new AppError(
        "Department name is required",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    const existingDepartment = await this.departmentRepo.findByName(name);
    if (existingDepartment) {
      throw new AppError(
        "Department name already exist.",
        HTTP_STATUS.CONFLICT,
      );
    }
    const lastDepartment = await this.departmentRepo.findlastDepartment();
    let departmentCode = "DEP001";
    if (lastDepartment?.departmentCode) {
      const lastNumber = Number(
        lastDepartment.departmentCode.replace("DEP", ""),
      );
      departmentCode = `DEP${String(lastNumber + 1).padStart(3, "0")}`;
    }
    return await this.departmentRepo.create({
      name,
      description: request.description?.trim(),
      departmentCode,
    });
  }
}
