import { inject, injectable } from "inversify";
import { Department } from "../../../domain/entities/department/department.entities";
import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import { IGetDepartmentUseCase } from "../../repository/department/IGetDepartment";
import { TYPES } from "../../../di/types/types";

@injectable()
export default class GetDepartmentUsecase implements IGetDepartmentUseCase {
  constructor(
    @inject(TYPES.DepartmentRepo)
    private _departmentRepo: IDepartmentRepo,
  ) {}
  async execute(): Promise<Department[]> {
    return await this._departmentRepo.findAll();
  }
}
