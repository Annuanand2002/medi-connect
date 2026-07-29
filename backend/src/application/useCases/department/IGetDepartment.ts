import { Department } from "../../../domain/entities/department/department.entities";

export interface IGetDepartmentUseCase {
  execute(): Promise<Department[]>;
}
