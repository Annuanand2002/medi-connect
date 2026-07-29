import { Department } from "../../../domain/entities/department/department.entities";
import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import { IGetDepartmentUseCase } from "../../repository/department/IGetDepartment";

export default class GetDepartmentUsecase implements IGetDepartmentUseCase {
  constructor(private departmentRepo: IDepartmentRepo) {}
  async execute(): Promise<Department[]> {
    return await this.departmentRepo.findAll();
  }
}
